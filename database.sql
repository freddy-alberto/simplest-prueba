--
-- PostgreSQL database dump
--

\restrict sRPOCbSSRzeko0GWfrpOHXbzu77OZjCj6WUh9WAW2IAkQyXzGa2zu2HgnQandeV

-- Dumped from database version 18.1
-- Dumped by pg_dump version 18.1

-- Started on 2026-02-09 04:31:19

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 224 (class 1259 OID 24609)
-- Name: auditoria; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.auditoria (
    id integer NOT NULL,
    usuario character varying(50) NOT NULL,
    accion character varying(100) NOT NULL,
    detalles text,
    fecha timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.auditoria OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 24608)
-- Name: auditoria_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.auditoria_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.auditoria_id_seq OWNER TO postgres;

--
-- TOC entry 5039 (class 0 OID 0)
-- Dependencies: 223
-- Name: auditoria_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.auditoria_id_seq OWNED BY public.auditoria.id;


--
-- TOC entry 222 (class 1259 OID 24590)
-- Name: products; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.products (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    category character varying(50),
    stock integer DEFAULT 0,
    price numeric(10,2) NOT NULL,
    user_id integer
);


ALTER TABLE public.products OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 24589)
-- Name: products_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.products_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.products_id_seq OWNER TO postgres;

--
-- TOC entry 5040 (class 0 OID 0)
-- Dependencies: 221
-- Name: products_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.products_id_seq OWNED BY public.products.id;


--
-- TOC entry 220 (class 1259 OID 24578)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    username character varying(50) NOT NULL,
    password character varying(255) NOT NULL,
    role character varying(20) DEFAULT 'empleado'::character varying
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 24577)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO postgres;

--
-- TOC entry 5041 (class 0 OID 0)
-- Dependencies: 219
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- TOC entry 4870 (class 2604 OID 24612)
-- Name: auditoria id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auditoria ALTER COLUMN id SET DEFAULT nextval('public.auditoria_id_seq'::regclass);


--
-- TOC entry 4868 (class 2604 OID 24593)
-- Name: products id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products ALTER COLUMN id SET DEFAULT nextval('public.products_id_seq'::regclass);


--
-- TOC entry 4866 (class 2604 OID 24581)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 5033 (class 0 OID 24609)
-- Dependencies: 224
-- Data for Name: auditoria; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.auditoria (id, usuario, accion, detalles, fecha) FROM stdin;
4	Sistema	ACTUALIZAR	Modificó producto ID: 7 (Precio: 8, Stock: 30)	2026-02-09 04:02:25.334526
5	Sistema	ACTUALIZAR	Modificó producto ID: 7 (Precio: 8, Stock: 35)	2026-02-09 04:02:54.064271
6	Sistema	ACTUALIZAR	Modificó producto ID: 6 (Precio: 20.45, Stock: 250)	2026-02-09 04:05:18.472156
7	Sistema	ACTUALIZAR	Modificó producto ID: 6 (Precio: 20.4, Stock: 250)	2026-02-09 04:06:59.653517
8	Desconocido	ACTUALIZAR	Modificó producto ID: 6 (Precio: 20.48, Stock: 250)	2026-02-09 04:07:51.757596
9	Desconocido	ACTUALIZAR	Modificó producto ID: 7 (Precio: 8.05, Stock: 35)	2026-02-09 04:09:57.643377
10	Desconocido	ACTUALIZAR	Modificó producto ID: 6 (Precio: 20.49, Stock: 250)	2026-02-09 04:14:36.504379
11	Desconocido	ACTUALIZAR	Modificó producto ID: 6 (Precio: 20.45, Stock: 250)	2026-02-09 04:16:13.246666
12	freddy25	ACTUALIZAR	Modificó producto ID: 7 (Precio: 8.15, Stock: 35)	2026-02-09 04:19:24.1079
13	freddy	ACTUALIZAR	Modificó producto ID: 17 (Precio: 25, Stock: 152)	2026-02-09 04:21:55.4759
14	freddy	CREAR	Añadió el producto: pollo	2026-02-09 04:22:16.861185
15	freddy	CREAR	Añadió el producto: brocoli	2026-02-09 04:22:43.319125
16	freddy	ACTUALIZAR	Modificó producto ID: 21 (Precio: 4, Stock: 200)	2026-02-09 04:22:49.362504
17	freddy	CREAR	Añadió el producto: papa	2026-02-09 04:23:20.203794
18	freddy	ACTUALIZAR	Modificó producto ID: 22 (Precio: 1.58, Stock: 405)	2026-02-09 04:23:25.024363
19	freddy	CREAR	Añadió el producto: sss	2026-02-09 04:23:31.995953
20	freddy	ELIMINAR	Eliminó el producto: papa	2026-02-09 04:23:34.860129
21	elias	ACTUALIZAR	Modificó producto ID: 23 (Precio: 22, Stock: 300)	2026-02-09 04:24:14.347041
22	freddy	ELIMINAR	Eliminó el producto: sss	2026-02-09 04:24:36.225063
23	freddy	CREAR	Añadió el producto: papa	2026-02-09 04:24:55.533551
24	freddy	CREAR	Añadió el producto: lechuga romana	2026-02-09 04:25:57.971014
\.


--
-- TOC entry 5031 (class 0 OID 24590)
-- Dependencies: 222
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.products (id, name, category, stock, price, user_id) FROM stdin;
16	harina	\N	400	5.20	\N
6	pan	\N	250	20.45	\N
7	arroz	\N	35	8.15	\N
17	carne	\N	152	25.00	\N
20	pollo	\N	300	25.00	\N
21	brocoli	\N	200	4.00	\N
24	papa	\N	450	1.55	\N
25	lechuga romana	\N	200	2.00	\N
\.


--
-- TOC entry 5029 (class 0 OID 24578)
-- Dependencies: 220
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, username, password, role) FROM stdin;
3	elias	$2b$10$46LonMsA5oIC/tss2oZYp.2Afahxik0FU4joVQmRQyErYtLr8L0Ci	empleado
1	freddy	$2b$10$Mgu1luTMS02c4n9RoTqHf./FgDFF1yHqC8E52f2TTqt5heIREfuv.	admin
7	eddy	$2b$10$mV3sTqu7T5SYvIZFvpChF.5AIoo9KlX0YJcOarD1NLM00yBYnFivK	admin
19	freddy1	$2b$10$yWx9pmHUqhIvA1g5NHj1QuBCubhEiCEvQ2YeH6PbSREoZkwqR9W0K	bloqueado
11	milan	$2b$10$RxwuYE5I7AOSZ50SeRLjHueON3ZYzdg3a46AKcS1Y.8gxgCSldUZy	bloqueado
14	milan1	$2b$10$oRKk54oSOof5EURGyuG.3eAxjuObJCUbjK9IkAi0zAztUSVnVgVba	admin
2	elias 	$2b$10$rIC4hxUDYelY8xEDXhYhb.xkmQbvT2XxxYa3YK2hVG7pGgY43.api	empleado
28	freddy25	$2b$10$zEYQ4qje/BhVKxQ5MoCyeuatlPD.SsM3avLTbJPuIHZXVy04kqOsC	admin
\.


--
-- TOC entry 5042 (class 0 OID 0)
-- Dependencies: 223
-- Name: auditoria_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.auditoria_id_seq', 24, true);


--
-- TOC entry 5043 (class 0 OID 0)
-- Dependencies: 221
-- Name: products_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.products_id_seq', 25, true);


--
-- TOC entry 5044 (class 0 OID 0)
-- Dependencies: 219
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 28, true);


--
-- TOC entry 4879 (class 2606 OID 24620)
-- Name: auditoria auditoria_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auditoria
    ADD CONSTRAINT auditoria_pkey PRIMARY KEY (id);


--
-- TOC entry 4877 (class 2606 OID 24599)
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);


--
-- TOC entry 4873 (class 2606 OID 24586)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 4875 (class 2606 OID 24588)
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- TOC entry 4880 (class 2606 OID 24600)
-- Name: products products_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


-- Completed on 2026-02-09 04:31:20

--
-- PostgreSQL database dump complete
--

\unrestrict sRPOCbSSRzeko0GWfrpOHXbzu77OZjCj6WUh9WAW2IAkQyXzGa2zu2HgnQandeV

