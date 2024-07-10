/* 
    Esta es una función para obtener el rol de un usuario
    de forma legible para el usuario común
*/

export function getReadableRole(rol: string) {
  switch (rol) {
    case "ROLE_ADMIN":
      return "Administrador";
    case "ROLE_CONSULTOR":
      return "Consultor";
    case "ROLE_CLIENTE":
        return "Cliente";
    case "ROLE_USER":
        return "Usuario";
    default:
      return "";
  }
}