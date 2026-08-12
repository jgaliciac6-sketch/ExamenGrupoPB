# ExamenGrupoPB

Aplicación full-stack compuesta por:

- **backend**: API REST con Node.js, Express 5, TypeScript y PostgreSQL (`pg`).
- **frontend**: Aplicación Next.js 16 (React 19 + TypeScript + Tailwind).

Este documento explica cómo instalar y levantar el proyecto completo (base de datos, backend y frontend) desde cero.

---

## 1. Requisitos previos

Antes de empezar, instala en tu equipo:

- [Node.js](https://nodejs.org/) 18 o superior (incluye `npm`).
- [PostgreSQL](https://www.postgresql.org/download/) (servidor de base de datos).
- [pgAdmin](https://www.pgadmin.org/download/) (cliente gráfico para administrar PostgreSQL).
- [Git](https://git-scm.com/) (para clonar el repositorio, opcional si ya lo tienes).

---

## 2. Clonar el repositorio

```bash
git clone https://github.com/jgaliciac6-sketch/ExamenGrupoPB.git
cd ExamenGrupoPB
```

La estructura del proyecto es:

```
ExamenGrupoPB/
├── backend/    # API REST (Express + TypeScript + PostgreSQL)
└── frontend/   # Aplicación web (Next.js)
```

---

## 3. Instalar la base de datos con pgAdmin

### 3.1 Crear la base de datos

1. Abre **pgAdmin** y conéctate a tu servidor local de PostgreSQL.
2. En el panel izquierdo, haz clic derecho sobre **Databases** → **Create** → **Database...**
3. En el campo **Database**, escribe exactamente: `ExamenGrupoPB`
4. Guarda con **Save**.

### 3.2 Ejecutar el script SQL

1. Haz clic derecho sobre la base de datos **ExamenGrupoPB** recién creada → **Query Tool**.
2. Copia **todo** el bloque de código SQL de la sección siguiente y pégalo en el editor del Query Tool.
3. Ejecuta el script con el botón ▶️ (o `F5`).

Esto creará las tablas `GPB_EMPLEADO` y `GPB_USUARIO`, las funciones necesarias (`fn_gpb_get_empleado`, `fn_gpb_get_empleado_login`, `fn_gpb_get_users`, `fn_gpb_set_user_create`) y cargará los datos iniciales (un empleado administrador y dos usuarios de ejemplo).

> **Usuario administrador de prueba** (para hacer login en el backend):
>
> - `EMPId`: `1`
> - `EMPPassword`: `1234`

### 3.3 Script SQL (copiar y pegar completo)

```sql
--
-- PostgreSQL database dump
--

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: fn_gpb_get_empleado(integer); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.fn_gpb_get_empleado(emp_id integer) RETURNS TABLE("EMPId" integer, "EMPNombre" character varying, "EMPDPI" character varying, "EMPPassword" character varying, "EMPFechaCreacion" timestamp without time zone, "EMPFechaModificacion" timestamp without time zone, "EMPEstado" boolean)
    LANGUAGE plpgsql
    AS $$
BEGIN
    RETURN QUERY
    SELECT
        e."EMPId",
        e."EMPNombre",
        e."EMPDPI",
        e."EMPPassword",
        e."EMPFechaCreacion",
        e."EMPFechaModificacion",
        e."EMPEstado"
    FROM "GPB_EMPLEADO" e
    WHERE e."EMPId" = emp_id
      AND e."EMPEstado" = TRUE;
END;
$$;

ALTER FUNCTION public.fn_gpb_get_empleado(emp_id integer) OWNER TO postgres;

--
-- Name: fn_gpb_get_empleado_login(integer, character varying); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.fn_gpb_get_empleado_login(emp_id integer, emp_password character varying) RETURNS TABLE("EMPId" integer, "EMPNombre" character varying, "EMPDPI" character varying, "EMPPassword" character varying, "EMPFechaCreacion" timestamp without time zone, "EMPFechaModificacion" timestamp without time zone, "EMPEstado" boolean)
    LANGUAGE plpgsql
    AS $$
BEGIN
    RETURN QUERY
    SELECT
        e."EMPId",
        e."EMPNombre",
        e."EMPDPI",
        e."EMPPassword",
        e."EMPFechaCreacion",
        e."EMPFechaModificacion",
        e."EMPEstado"
    FROM "GPB_EMPLEADO" e
    WHERE e."EMPId" = emp_id
      AND e."EMPPassword" = emp_password
      AND e."EMPEstado" = TRUE;
END;
$$;

ALTER FUNCTION public.fn_gpb_get_empleado_login(emp_id integer, emp_password character varying) OWNER TO postgres;

--
-- Name: fn_gpb_get_users(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.fn_gpb_get_users() RETURNS TABLE("USRId" integer, "USRNombre" character varying, "USRCorreo" character varying, "USRTelefono" character varying, "USRGeneroFavorito" character varying, "USRPlataformaFavorita" character varying, "USRComentario" text, "USREstado" boolean)
    LANGUAGE plpgsql
    AS $$
BEGIN
    RETURN QUERY
    SELECT
        u."USRId",
        u."USRNombre",
        u."USRCorreo",
        u."USRTelefono",
        u."USRGeneroFavorito",
        u."USRPlataformaFavorita",
        u."USRComentario",
        u."USREstado"
    FROM "GPB_USUARIO" u;
END;
$$;

ALTER FUNCTION public.fn_gpb_get_users() OWNER TO postgres;

--
-- Name: fn_gpb_set_user_create(character varying, character varying, character varying, character varying, character varying, text); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.fn_gpb_set_user_create(p_nombre character varying, p_correo character varying, p_telefono character varying, p_genero_favorito character varying, p_plataforma_favorita character varying, p_comentario text) RETURNS integer
    LANGUAGE plpgsql
    AS $$
DECLARE
    v_usr_id INT;
BEGIN
    IF EXISTS (
        SELECT 1
        FROM "GPB_USUARIO"
        WHERE "USRCorreo" = p_correo
    ) THEN
        RETURN -1;
    END IF;

    INSERT INTO "GPB_USUARIO" (
        "USRNombre",
        "USRCorreo",
        "USRTelefono",
        "USRGeneroFavorito",
        "USRPlataformaFavorita",
        "USRComentario",
        "USREstado"
    )
    VALUES (
        p_nombre,
        p_correo,
        p_telefono,
        p_genero_favorito,
        p_plataforma_favorita,
        p_comentario,
        TRUE
    )
    RETURNING "USRId"
    INTO v_usr_id;

    RETURN v_usr_id;
END;
$$;

ALTER FUNCTION public.fn_gpb_set_user_create(p_nombre character varying, p_correo character varying, p_telefono character varying, p_genero_favorito character varying, p_plataforma_favorita character varying, p_comentario text) OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: GPB_EMPLEADO; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."GPB_EMPLEADO" (
    "EMPId" integer NOT NULL,
    "EMPNombre" character varying(150) NOT NULL,
    "EMPDPI" character varying(14) NOT NULL,
    "EMPPassword" character varying(255) NOT NULL,
    "EMPFechaCreacion" timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "EMPFechaModificacion" timestamp without time zone,
    "EMPEstado" boolean DEFAULT true NOT NULL
);

ALTER TABLE public."GPB_EMPLEADO" OWNER TO postgres;

--
-- Name: GPB_EMPLEADO_EMPId_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public."GPB_EMPLEADO" ALTER COLUMN "EMPId" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."GPB_EMPLEADO_EMPId_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

--
-- Name: GPB_USUARIO; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."GPB_USUARIO" (
    "USRId" integer NOT NULL,
    "USRNombre" character varying(150) NOT NULL,
    "USRCorreo" character varying(150) NOT NULL,
    "USRTelefono" character varying(8) NOT NULL,
    "USRGeneroFavorito" character varying(30) NOT NULL,
    "USRPlataformaFavorita" character varying(20) NOT NULL,
    "USRComentario" text,
    "USREstado" boolean DEFAULT true NOT NULL
);

ALTER TABLE public."GPB_USUARIO" OWNER TO postgres;

--
-- Name: GPB_USUARIO_USRId_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public."GPB_USUARIO" ALTER COLUMN "USRId" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."GPB_USUARIO_USRId_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

--
-- Data for Name: GPB_EMPLEADO; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."GPB_EMPLEADO" ("EMPId", "EMPNombre", "EMPDPI", "EMPPassword", "EMPFechaCreacion", "EMPFechaModificacion", "EMPEstado") FROM stdin;
1	Administrador	1234567890101	1234	2026-08-11 20:30:39.243797	\N	t
\.

--
-- Data for Name: GPB_USUARIO; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."GPB_USUARIO" ("USRId", "USRNombre", "USRCorreo", "USRTelefono", "USRGeneroFavorito", "USRPlataformaFavorita", "USRComentario", "USREstado") FROM stdin;
1	Carlos Méndez	carlos.mendez@email.com	55554444	RPG	PlayStation	Me interesan los lanzamientos y promociones de videojuegos.	t
2	Javier Galicia	javier.galicia@email.com	44443333	SoulsLike	PlayStation	Me gustan los juegos de Sonic.	t
\.

--
-- Name: GPB_EMPLEADO_EMPId_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."GPB_EMPLEADO_EMPId_seq"', 1, true);

--
-- Name: GPB_USUARIO_USRId_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."GPB_USUARIO_USRId_seq"', 2, true);

--
-- Name: GPB_EMPLEADO GPB_EMPLEADO_EMPDPI_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."GPB_EMPLEADO"
    ADD CONSTRAINT "GPB_EMPLEADO_EMPDPI_key" UNIQUE ("EMPDPI");

--
-- Name: GPB_EMPLEADO GPB_EMPLEADO_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."GPB_EMPLEADO"
    ADD CONSTRAINT "GPB_EMPLEADO_pkey" PRIMARY KEY ("EMPId");

--
-- Name: GPB_USUARIO GPB_USUARIO_USRCorreo_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."GPB_USUARIO"
    ADD CONSTRAINT "GPB_USUARIO_USRCorreo_key" UNIQUE ("USRCorreo");

--
-- Name: GPB_USUARIO GPB_USUARIO_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."GPB_USUARIO"
    ADD CONSTRAINT "GPB_USUARIO_pkey" PRIMARY KEY ("USRId");

--
-- PostgreSQL database dump complete
--
```

> **Nota:** si al pegar el script en pgAdmin ves un mensaje de error en las primeras líneas, verifica que no se hayan copiado caracteres extra al inicio o al final del bloque de código.

---

## 4. Configurar el backend

### 4.1 Variables de entorno

Dentro de `backend/` ya existe un archivo `.env` (o créalo si no existe) con este contenido, ajustando usuario/contraseña de tu PostgreSQL local si son distintos:

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=ExamenGrupoPB
DB_USER=postgres
DB_PASSWORD=root
JWT_SECRET=ExamenGrupoPB2026081
PORT=4000
```

| Variable      | Descripción                                               |
| ------------- | --------------------------------------------------------- |
| `DB_HOST`     | Host del servidor de PostgreSQL (`localhost` normalmente) |
| `DB_PORT`     | Puerto de PostgreSQL (`5432` por defecto)                 |
| `DB_NAME`     | Nombre de la base de datos (`ExamenGrupoPB`)              |
| `DB_USER`     | Usuario de PostgreSQL                                     |
| `DB_PASSWORD` | Contraseña de ese usuario                                 |
| `JWT_SECRET`  | Clave secreta para firmar los tokens JWT                  |
| `PORT`        | Puerto donde correrá la API (`4000` por defecto)          |

### 4.2 Instalar dependencias

```bash
cd backend
npm i
```

### 4.3 Levantar el servidor

```bash
npm run dev
```

Si todo está correcto, verás en consola:

```
Base de datos conectada correctamente
Rest API en el puerto 4000
```

La API quedará disponible en `http://localhost:4000`.

---

## 5. Configurar el frontend

### 5.1 Instalar dependencias

En otra terminal:

```bash
cd frontend
npm i
```

### 5.2 Levantar la aplicación

```bash
npm run dev
```

El frontend quedará disponible en `http://localhost:3000`.

> Asegúrate de que el backend (paso 4) esté corriendo en `http://localhost:4000` para que el frontend pueda consumir la API.

---

## 6. Documentación de endpoints

URL base del backend: `http://localhost:4000`

Todas las peticiones y respuestas son en formato **JSON**. Las rutas protegidas requieren el header:

```
Authorization: Bearer <token>
```

### 6.1 Empleado

#### `POST /api/Empleado/getEmpleado`

Autentica a un empleado (login) y devuelve un token JWT.

**Body:**

```json
{
  "EMPId": 1,
  "EMPPassword": "1234"
}
```

**Respuesta 200 OK:**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "EMPId": 1,
  "EMPNombre": "Administrador"
}
```

**Posibles errores:**

- `400` — Faltan `EMPId` o `EMPPassword`.
- `401` — Usuario o contraseña incorrectos.
- `500` — Error interno del servidor.

---

### 6.2 Usuario

#### `GET /api/Usuario/getUsuarios` 🔒 (requiere token)

Devuelve el listado de usuarios registrados.

**Headers:**

```
Authorization: Bearer <token>
```

**Respuesta 200 OK:**

```json
{
  "usuarios": [
    {
      "USRId": 1,
      "USRNombre": "Carlos Méndez",
      "USRCorreo": "carlos.mendez@email.com",
      "USRTelefono": "55554444",
      "USRGeneroFavorito": "RPG",
      "USRPlataformaFavorita": "PlayStation",
      "USRComentario": "Me interesan los lanzamientos y promociones de videojuegos.",
      "USREstado": true
    }
  ]
}
```

**Posibles errores:**

- `401` — No autorizado / sin token / token inválido / no se encontraron usuarios.
- `500` — Error interno del servidor.

#### `POST /api/Usuario/user`

Crea un nuevo usuario (registro público, no requiere token).

**Body:**

```json
{
  "USRNombre": "Ana López",
  "USRCorreo": "ana.lopez@email.com",
  "USRTelefono": "12345678",
  "USRGeneroFavorito": "Aventura",
  "USRPlataformaFavorita": "Xbox",
  "USRComentario": "Comentario opcional"
}
```

**Respuesta 201 Created:**

```json
{
  "message": "Usuario creado correctamente",
  "data": {
    "usrId": 3
  }
}
```

**Posibles errores:**

- `400` — El correo ya se encuentra registrado / error al crear usuario.
- `500` — Error interno del servidor.

---

## 7. Resumen rápido de comandos

```bash
# 1. Base de datos: crear "ExamenGrupoPB" en pgAdmin y pegar el script SQL de la sección 3.3

# 2. Backend
cd backend
npm i
npm run dev      # http://localhost:4000

# 3. Frontend (en otra terminal)
cd frontend
npm i
npm run dev      # http://localhost:3000
```
