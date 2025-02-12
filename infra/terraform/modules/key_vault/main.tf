data "azurerm_client_config" "current" {}

resource "azurerm_key_vault" "kv" {
  name                = "kv-${var.random_suffix}"
  resource_group_name = var.resource_group_name
  location            = var.resource_group_location
  sku_name            = "standard"
  tenant_id           = data.azurerm_client_config.current.tenant_id
}
