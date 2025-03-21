resource "azurerm_storage_account" "blob" {
  name                          = "blobsa${var.random_suffix}"
  resource_group_name           = var.resource_group_name
  location                      = var.resource_group_location
  account_kind                  = "BlobStorage"
  account_tier                  = "Standard"
  account_replication_type      = "LRS"
  access_tier                   = "Hot"
  public_network_access_enabled = true
}

resource "azurerm_storage_container" "book_images" {
  name                  = "bookimages"
  storage_account_id    = azurerm_storage_account.blob.id
  container_access_type = "blob"
}

# resource "azurerm_cdn_frontdoor_profile" "main" {
#   name                = "main"
#   resource_group_name = var.resource_group_name
#   sku_name            = "Standard_AzureFrontDoor"
# }

# resource "azurerm_cdn_frontdoor_endpoint" "blob_endpoint" {
#   name                     = "blob-endpoint"
#   cdn_frontdoor_profile_id = azurerm_cdn_frontdoor_profile.main.id
# }

# resource "azurerm_cdn_frontdoor_origin_group" "blob_group" {
#   name                     = "blob-group"
#   cdn_frontdoor_profile_id = azurerm_cdn_frontdoor_profile.frontdoor.id

#   load_balancing {
#     sample_size                 = 4
#     successful_samples_required = 2
#   }

#   health_probe {
#     interval_in_seconds = 120
#     path                = "/"
#     protocol            = "Http"
#     request_type        = "HEAD"
#   }
# }

# resource "azurerm_cdn_frontdoor_origin" "blob_origin" {
#   name                          = "blob-origin"
#   cdn_frontdoor_origin_group_id = azurerm_cdn_frontdoor_origin_group.origin_group.id
#   enabled                       = true

#   host_name                      = azurerm_storage_account.blob.primary_web_endpoint
#   origin_host_header             = azurerm_storage_account.blob.primary_web_endpoint
#   http_port                      = 80
#   https_port                     = 443
#   certificate_name_check_enabled = false
# }

# resource "azurerm_cdn_frontdoor_route" "route" {
#   name                          = "blob-route"
#   cdn_frontdoor_endpoint_id     = azurerm_cdn_frontdoor_endpoint.endpoint.id
#   cdn_frontdoor_origin_group_id = azurerm_cdn_frontdoor_origin_group.blob_origin.id
#   cdn_frontdoor_origin_ids      = [azurerm_cdn_frontdoor_origin.blob_origin.id]

#   patterns_to_match   = ["/*"]
#   supported_protocols = ["Http", "Https"]
#   forwarding_protocol = "MatchRequest"
# }
