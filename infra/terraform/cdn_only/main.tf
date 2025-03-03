resource "azurerm_resource_group" "cdn_only" {
  name     = "mobile-cdn-only"
  location = "South East Asia"
}

module "cdn" {
  source                  = "../modules/cdn"
  resource_group_name     = azurerm_resource_group.cdn_only.name
  resource_group_location = azurerm_resource_group.cdn_only.location
}
