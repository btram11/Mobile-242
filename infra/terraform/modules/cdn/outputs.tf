output "sa_hostname" {
  value = azurerm_storage_account.blob.primary_blob_host
}

output "sa_key" {
  value     = azurerm_storage_account.blob.primary_access_key
  sensitive = true
}

output "sa_name" {
  value = azurerm_storage_account.blob.name
}
