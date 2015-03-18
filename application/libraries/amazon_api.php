<?php
/**
 * Created by PhpStorm.
 * User: root
 * Date: 24/9/14
 * Time: 12:04 PM
 */
Class Amazon_api extends Curl{

    function aws_signed_request($region, $params,$associate_tag=NULL, $version='2011-08-01'){
    /*
    Copyright (c) 2009-2012 Ulrich Mierendorff

    Permission is hereby granted, free of charge, to any person obtaining a
    copy of this software and associated documentation files (the "Software"),
    to deal in the Software without restriction, including without limitation
    the rights to use, copy, modify, merge, publish, distribute, sublicense,
    and/or sell copies of the Software, and to permit persons to whom the
    Software is furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in
    all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
    THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
    FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
    DEALINGS IN THE SOFTWARE.
    */

    /*
    Parameters:
        $region - the Amazon(r) region (ca,com,co.uk,de,fr,co.jp)
        $params - an array of parameters, eg. array("Operation"=>"ItemLookup",
                        "ItemId"=>"B000X9FLKM", "ResponseGroup"=>"Small")
        $public_key - your "Access Key ID"
        $private_key - your "Secret Access Key"
        $version (optional)
    */

    // some paramters
        $method = 'GET';
        $host = 'webservices.amazon.'.$region;
        $uri = '/onca/xml';

        // additional parameters
        $params['Service'] = 'AWSECommerceService';
        $params['AWSAccessKeyId'] = "AKIAJVQRJSENON6P5UOA";
        $private_key="6IeEikE6Zb1h3mJFbSGtJdBBFmJa5l3igbDxryPu";
        // GMT timestamp
        $params['Timestamp'] = gmdate('Y-m-d\TH:i:s\Z');
        // API version
        $params['Version'] = $version;
        if ($associate_tag !== NULL) {
            $params['AssociateTag'] = $associate_tag;
        }
        else
            $params['AssociateTag'] = "NULL";
        // sort the parameters
        ksort($params);

        // create the canonicalized query
        $canonicalized_query = array();
        foreach ($params as $param=>$value)
        {
            $param = str_replace('%7E', '~', rawurlencode($param));
            $value = str_replace('%7E', '~', rawurlencode($value));
            $canonicalized_query[] = $param.'='.$value;
        }
        $canonicalized_query = implode('&', $canonicalized_query);

        // create the string to sign
        $string_to_sign = $method."\n".$host."\n".$uri."\n".$canonicalized_query;

        // calculate HMAC with SHA256 and base64-encoding
        $signature = base64_encode(hash_hmac('sha256', $string_to_sign, $private_key, TRUE));

        // encode the signature for the request
        $signature = str_replace('%7E', '~', rawurlencode($signature));

        // create request
        $request = 'http://'.$host.$uri.'?'.$canonicalized_query.'&Signature='.$signature;

        return $request;
    }

    public function topSelling(){
        $category=array("976389031","976416031","976419031","976442031","1951048031","976392031","1350380031","1350387031");
        $selectCat=rand(0,count($category)-1);
        $categoryId=$category[$selectCat];
        //$categoryId="1350380031";

        $operation=array("Operation"=>"BrowseNodeLookup","BrowseNodeId"=>$categoryId,"ResponseGroup"=>"TopSellers");
        $topSellers=$this->parseTopSellling($this->aws_signed_request("in",$operation));
        //  var_dump($topSellers);
        return $topSellers;
    }

    public function topArrival(){
        $category=array("976389031","976416031","976419031","976442031","1951048031","976392031","1350380031","1350387031");
        $selectCat=rand(0,count($category)-1);
        $categoryId=$category[$selectCat];
        //$categoryId="1350380031";

        $operation=array("Operation"=>"BrowseNodeLookup","BrowseNodeId"=>$categoryId,"ResponseGroup"=>"NewReleases");
        $newArrival=$this->parseNewArrival($this->aws_signed_request("in",$operation));
        //  var_dump($topSellers);
        return $newArrival;
    }

    public function parseTopSellling($url){
        $result=$this->parseResult($url);
        $data=array();
        $size=0;
        foreach ($result->BrowseNodes->BrowseNode->TopSellers->TopSeller as $info):
            $data[$size++]=array('product_id'=>$info->ASIN,
                'title'=>$info->Title
            );
        endforeach;

        $response=array();
        $j=0;
        for($i=0;$i<count($data);$i++){
            if(($temp=$this->getDescription($data[$i]['product_id'],'Medium'))!=false){
                $response[$j++]=$temp;
            }
        }
        return $response;
    }

    public function parseNewArrival($url){
        $result=$this->parseResult($url);
        $data=array();
        $size=0;
        foreach ($result->BrowseNodes->BrowseNode->NewReleases->NewRelease as $info):
            $data[$size++]=array('product_id'=>$info->ASIN,
                'title'=>$info->Title
            );
        endforeach;

        $response=array();
        $j=0;
        for($i=0;$i<count($data);$i++){
            if(($temp=$this->getDescription($data[$i]['product_id'],'Medium'))!=false){
                $response[$j++]=$temp;
            }
        }
        return $response;
    }

    public function getDescription($asin,$response_group){
        $operation=array("Operation"=>"ItemLookup","ItemId"=>$asin,"IdType"=>"ASIN","ResponseGroup"=>$response_group);
        //   echo $this->api->aws_signed_request("in",$operation);
        return $this->parseDescription($this->aws_signed_request("in",$operation));
    }

    public function parseDescription($url){
        try{
            $result=$this->parseResult($url);

            $item=$result->Items->Item;
            return array("product_id"=>$this->getId($item),"title"=>$this->getTitle($item),"image"=>$this->getMediumImage($item),"price"=>$this->getPrice($item),"amount"=>$this->getAmount($item), "manufacturer"=>$this->getManufacturer($item),"product_group"=>$this->getProductGroup($item));
        }
        catch(Exception $e){
            return $this->parseDescription($url);
        }
    }

    public function getSearchProduct($category,$keyword){
        $size=0;
        $CI =& get_instance();
        $response=array();

        do{
        $CI->session->set_userdata("item_page",$CI->session->userdata("item_page")+1);
            if(func_num_args()>2){
                $brand=func_get_arg(2);
                $operation=array("Operation"=>"ItemSearch","Keywords"=>$keyword,"SearchIndex"=>$category,"Brand"=>$brand,"ItemPage"=>$CI->session->userdata("item_page"),"ResponseGroup"=>"Medium,BrowseNodes");
            }
            else
                $operation=array("Operation"=>"ItemSearch","Keywords"=>$keyword,"SearchIndex"=>$category,"ItemPage"=>$CI->session->userdata("item_page"),"ResponseGroup"=>"Medium,BrowseNodes");

        $result=$this->parseResult($this->aws_signed_request("in",$operation));
        $items=$result->Items;
        $CI->session->set_userdata("total_pages","".$items->TotalPages);


            foreach ($result->Items->Item as $item):
                if($size>15)
                    break;
             //   echo $size;
            $response[$size++]=array('product_id'=>$this->getId($item),
                                     'image'=>$this->getMediumImage($item),
                                     'title'=>$this->getTitle($item),
                                     'price'=>$this->getPrice($item),
                                     'manufacturer'=>$this->getManufacturer($item),
                                     'product_group'=>$this->getProductGroup($item),
                                     'browse_node_id'=>$this->getBrowseID($item),
                                     );
            endforeach;
       }
       while($size<16 && $CI->session->userdata("item_page")<$CI->session->userdata("total_pages"));

        return $response;
    }

    public function parseResult($url){
        $a=new Curl();
        $a->create($url);
        $response=$a->execute();
        $result=new SimpleXMLElement($response);
        return $result;
    }

    public function getProduct($product_id){
        $operation=array("Operation"=>"ItemLookup","ItemId"=>$product_id,"IdType"=>"ASIN","ResponseGroup"=>"Large");

        return $this->parseProductDetail($this->aws_signed_request("in",$operation));
    }

    public function parseProductDetail($url){
        try{
            $result=$this->parseResult($url);
            // var_dump($result);
            // echo "<br>";
            $item=$result->Items->Item;
            $similar_product=array();
            $i=0;
            if(isset($item->SimilarProducts)){
                foreach($item->SimilarProducts->SimilarProduct as $similar):
                    $similar_product[$i++]=array('product_id'=>$similar->ASIN,
                                                 'title'=>$similar->Title);
                endforeach;
            }
            return array("product_id"=>$this->getId($item),"title"=>$this->getTitle($item),"image"=>$this->getLargeImage($item),"price"=>$this->getPrice($item),"amount"=>$this->getAmount($item), "manufacturer"=>$this->getManufacturer($item),"content"=>$this->getDesc($item),"feature"=>$this->getFeature($item),"imageset"=>$this->getImageSet($item),"product_group"=>$this->getProductGroup($item),"similar_product"=>$similar_product);
        }
        catch(Exception $e){
            return $this->parseProductDetail($url);
        }
    }

    public function getCartProduct($product_id){
        $operation=array("Operation"=>"ItemLookup","ItemId"=>$product_id,"IdType"=>"ASIN","ResponseGroup"=>"Medium");

        return $this->parseCartProduct($this->aws_signed_request("in",$operation));
    }

    public function parseCartProduct($url){
        try{
            $result=$this->parseResult($url);
            // var_dump($result);
            // echo "<br>";
            $item=$result->Items->Item;
            if($item->ASIN=="")
                $this->parseCartProduct($url);
            else
                return array("product_id"=>$this->getId($item),"title"=>$this->getTitle($item),"image"=>$this->getMediumImage($item),"amount"=>$this->getAmount($item));
        }
        catch(Exception $e){
            return $this->parseCartProduct($url);
        }
    }

    public function similarProduct($similar_product){
        $products=array();
        for($i=0;$i<count($similar_product);$i++){
            $products[$i]=$this->getDescription($similar_product[$i]['product_id'][0],"Medium");
        }
        return $products;
    }

    public function suggestClickProduct($product_ids){
        $operation=array("Operation"=>"SimilarityLookup","ItemId"=>$product_ids,"SimilarityType"=>"Random","ResponseGroup"=>"Medium,BrowseNodes");

        $result=$this->parseResult($this->aws_signed_request("in",$operation));
        $size=0;
        $response=array();

        foreach ($result->Items->Item as $item):
            $response[$size++]=array('product_id'=>$this->getId($item),
                                    'image'=>$this->getMediumImage($item),
                                    'title'=>$this->getTitle($item),
                                    'price'=>$this->getPrice($item),
                                    'manufacturer'=>$this->getManufacturer($item),
                                    'product_group'=>$this->getProductGroup($item),
                                    'browse_node_id'=>$this->getBrowseID($item),
            );
        endforeach;
        return $response;
    }


    public function getId($item){
            if(isset($item->ASIN))
                return $item->ASIN;
            else
                return "Not Available";
    }

    public function getTitle($item){
            if(isset($item->ItemAttributes->Title))
                return $item->ItemAttributes->Title;
            else
                return "Not Available";
    }

    public function getPrice($item){
            if(isset($item->ItemAttributes->ListPrice->FormattedPrice))
                return $item->ItemAttributes->ListPrice->FormattedPrice;

            elseif(isset($item->OfferSummary->LowestNewPrice->FormattedPrice))
                return $item->OfferSummary->LowestNewPrice->FormattedPrice;

            else
                return "Not Available";
    }

    public function getBrowseID($item){
        if(isset($item->BrowseNodes->BrowseNode->BrowseNodeId))
            return $item->BrowseNodes->BrowseNode->BrowseNodeId;
        else
            return "Not Available";

    }

    public function getManufacturer($item){
        if(isset($item->ItemAttributes->Manufacturer)){
           return $item->ItemAttributes->Manufacturer;
        }
        else{
            return "Not Available";
        }
    }
    public function getProductGroup($item){
        if(isset($item->ItemAttributes->ProductGroup)){
           return $item->ItemAttributes->ProductGroup;
        }
        else{
            return "Not Available";
        }
    }

    public function getImageSet($item){
        $imageSet=array();
        $size=0;
        if(isset($item->ImageSets->ImageSet)){
        foreach($item->ImageSets->ImageSet as $image_set):
            if($size>8)
                break;
            $imageSet[$size++]=$image_set->LargeImage;
        endforeach;
        }
        return $imageSet;
    }

    public function getLargeImage($item){
        if(isset($item->LargeImage))
            return $item->LargeImage;
        elseif(isset($item->MediumImage))
            return $item->MediumImage;
        else
            return "";
    }

    public function getMediumImage($item){
        if(isset($item->MediumImage))
            return $item->MediumImage;
        elseif(isset($item->SmallImage))
            return $item->SmallImage;
        else
            return "Not Available";
    }

    public function getAmount($item){
        if(isset($item->ItemAttributes->ListPrice->Amount))
            return $item->ItemAttributes->ListPrice->Amount;
        elseif(isset($item->OfferSummary->LowestNewPrice->Amount))
            return $item->OfferSummary->LowestNewPrice->Amount;
        else
            return "Not Available";
    }

    public function getFeature($item){
        if(isset($item->ItemAttributes->Feature)){
            $product_feature="";

            foreach($item->ItemAttributes->Feature as $feature ):
                $product_feature=$product_feature."<br>".$feature;
            endforeach;
            return $product_feature;
        }
        else{
            return "Not Available";
        }
    }

    public function getDesc($item){
        if(isset($item->EditorialReviews->EditorialReview->Content))
            return $item->EditorialReviews->EditorialReview->Content;
        else
            return "Not Available";
    }
    public function getSearchSuggestion($keyword,$category,$brand)
    {
        $size=0;
        $pageNo=1;
        $response=array();
        do{
            $pageNo++;
            $operation=array("Operation"=>"ItemSearch","Keywords"=>$keyword,"SearchIndex"=>$category,"brand"=>$brand,"ItemPage"=>$pageNo,"ResponseGroup"=>"Medium,Similarities");
            $result=$this->parseResult($this->aws_signed_request("in",$operation));
            $items=$result->Items;
            foreach ($result->Items->Item as $item):
                if($size>11)
                    break;
                //   echo $size;
                $response[$size++]=array('product_id'=>$this->getId($item),
                    'image'=>$this->getMediumImage($item),
                    'title'=>$this->getTitle($item),
                    'price'=>$this->getPrice($item),
                    'manufacturer'=>$this->getManufacturer($item),
                    'product_group'=>$this->getProductGroup($item),
                    'browse_node_id'=>$this->getBrowseID($item),
                );
            endforeach;
    }
    while($size<12 && $pageNo<$items->TotalPages);
        return $response;
    }
}
