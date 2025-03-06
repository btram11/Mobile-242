variable "resource_group_location" {
  description = "Location of the resource group"
}

variable "resource_group_name" {
  description = "Name of the resource group"
}

variable "random_suffix" {
  description = "Random suffix to append to the storage account name"
  default     = "meomeo"
}
