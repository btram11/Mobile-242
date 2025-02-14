variable "resource_group_name" {
  description = "Name of the resource group"
}

variable "resource_group_location" {
  description = "Location of the resource group"
}

variable "vnet_address_prefix" {
  description = "Address prefix for vnet"
  default     = ["10.0.0.0/16"]
}
