resource "azurerm_linux_virtual_machine" "backend" {
  name                  = "backend-vm"
  resource_group_name   = var.resource_group_name
  location              = var.resource_group_location
  size                  = "Standard_B1s"
  admin_username        = var.admin_username
  network_interface_ids = var.network_interface_ids
  user_data             = var.user_data

  admin_ssh_key {
    username   = var.admin_username
    public_key = var.public_ssh_key
  }

  os_disk {
    caching              = "ReadWrite"
    storage_account_type = "Standard_LRS"
  }

  source_image_reference {
    publisher = "Canonical"
    offer     = "ubuntu-24_04-lts"
    sku       = "server"
    version   = "latest"
  }

}
