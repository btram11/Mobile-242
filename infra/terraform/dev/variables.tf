variable "postgres_subnet_address_prefix" {
  description = "The address prefix for the Postgres subnet."
  default     = ["10.0.1.0/24"]
}

variable "redis_subnet_address_prefix" {
  description = "The address prefix for the redis subnet."
  default     = ["10.0.2.0/24"]
}

variable "backend_subnet_address_prefix" {
  description = "The address prefix for the backend subnet."
  default     = ["10.0.3.0/24"]
}
