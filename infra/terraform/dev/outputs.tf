output "backend_public_ip" {
  description = "Value of the backend public IP"
  value       = module.backend.backend_public_ip
}

output "backend_private_ip" {
  description = "Value of the backend private IP"
  value       = module.backend.backend_private_ip
}

output "postgres_fqdn" {
  description = "Value of the postgres FQDN"
  value       = module.postgres.postgres_fqdn
}

output "backend_fqdn" {
  description = "Value of the backend FQDN"
  value       = module.backend.backend_fqdn
}
