<?php
$query = $_SERVER["QUERY_STRING"] ?? "";
$location = "https://www.magidousa.com/";
$path_map = [
  "path=59" => "/products/manual-washers",
  "path=64" => "/products/top-load-washers",
  "path=65" => "/products/top-load-washers",
  "path=66" => "/products/top-load-washers",
  "path=67" => "/products/front-load-washers",
  "path=68" => "/products/rotary-immersion-washers",
  "path=69" => "/products/in-line-belt-conveyor-washers",
  "product_id=28" => "/products/manual-washers/dg-9",
  "product_id=29" => "/products/manual-washers/hp-30",
  "product_id=51" => "/products/manual-washers/hp-25",
  "product_id=54" => "/products/top-load-washers/l102",
  "product_id=55" => "/products/top-load-washers/l122",
];
foreach ($path_map as $key => $dest) {
  if (strpos($query, $key) !== false) {
    $location = "https://www.magidousa.com" . $dest;
    break;
  }
}
header("HTTP/1.1 301 Moved Permanently");
header("Location: " . $location);
exit;
