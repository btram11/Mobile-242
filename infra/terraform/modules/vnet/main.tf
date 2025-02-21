resource "azurerm_virtual_network" "main_vnet" {
  name                = "main-vnet"
  address_space       = var.vnet_address_prefix
  resource_group_name = var.resource_group_name
  location            = var.resource_group_location
}
