export interface IUsuario {
  USRId: number;
  USRNombre: string;
  USRCorreo: string;
  USRTelefono: string;
  USRGeneroFavorito: string;
  USRPlataformaFavorita: string;
  USRComentario?: string | null;
  USREstado: boolean;
}
