export type CreateUsuarioDto = {
    name: string,
    email: string,
    password: string,
    roles: string[]  
} 


export type UpdateUsuarioDetailsDto = {
    name: string,
    email: string,
    roles: string[]  
}

export type UpdatePasswordDto = {
    currentPassword: string,
    newPassword: string
}