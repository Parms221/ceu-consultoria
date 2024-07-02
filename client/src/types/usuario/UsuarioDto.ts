export type CreateUsuarioDto = {
  name: string;
  email: string;
  password: string;
  roles: string[];
  idCliente?: number;
};

export type UpdateUsuarioDetailsDto = {
  name: string;
  email: string;
  roles: string[];
  enabled: boolean;
};

export type UpdatePasswordDto = {
  currentPassword: string;
  newPassword: string;
};
