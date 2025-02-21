variable "random_suffix" {
  description = "The random suffix to append to the key vault name."
  default     = "meomeo"
}

variable "resource_group_name" {
  description = "The name of the resource group in which the resources will be created."
}

variable "resource_group_location" {
  description = "The location of the resource group in which the resources will be created."
}
