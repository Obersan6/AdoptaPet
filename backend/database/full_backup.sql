--
-- PostgreSQL database dump
--

-- Dumped from database version 16.3
-- Dumped by pg_dump version 16.3

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: breeds; Type: TABLE; Schema: public; Owner: obell
--

CREATE TABLE public.breeds (
    id integer NOT NULL,
    breed_name character varying(100) NOT NULL
);


ALTER TABLE public.breeds;

--
-- Name: breeds_id_seq; Type: SEQUENCE; Schema: public; Owner: obell
--

CREATE SEQUENCE public.breeds_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.breeds_id_seq;

--
-- Name: breeds_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: obell
--

ALTER SEQUENCE public.breeds_id_seq OWNED BY public.breeds.id;


--
-- Name: dog_attributes; Type: TABLE; Schema: public; Owner: obell
--

CREATE TABLE public.dog_attributes (
    dog_id integer NOT NULL,
    spayed_neutered boolean DEFAULT false,
    house_trained boolean DEFAULT false,
    declawed boolean DEFAULT false,
    special_needs boolean DEFAULT false,
    shots_current boolean DEFAULT false
);


ALTER TABLE public.dog_attributes;

--
-- Name: dog_tags; Type: TABLE; Schema: public; Owner: obell
--

CREATE TABLE public.dog_tags (
    dog_id integer NOT NULL,
    tag_id integer NOT NULL
);


ALTER TABLE public.dog_tags;

--
-- Name: dogs; Type: TABLE; Schema: public; Owner: obell
--

CREATE TABLE public.dogs (
    id integer NOT NULL,
    name character varying(100),
    location character varying(100) NOT NULL,
    status character varying(20) DEFAULT 'adoptable'::character varying NOT NULL,
    breed_id integer NOT NULL,
    age character varying(20) NOT NULL,
    gender character varying(20) NOT NULL,
    size character varying(20) NOT NULL,
    color character varying(20),
    coat character varying(50),
    description text,
    organization_id integer NOT NULL,
    image text,
    video text,
    published_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.dogs;

--
-- Name: dogs_id_seq; Type: SEQUENCE; Schema: public; Owner: obell
--

CREATE SEQUENCE public.dogs_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.dogs_id_seq;

--
-- Name: dogs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: obell
--

ALTER SEQUENCE public.dogs_id_seq OWNED BY public.dogs.id;


--
-- Name: organizations; Type: TABLE; Schema: public; Owner: obell
--

CREATE TABLE public.organizations (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    website character varying(255),
    phone character varying(20),
    email character varying(254),
    address character varying(200) NOT NULL,
    city character varying(100) NOT NULL,
    state character varying(100) NOT NULL,
    postcode character varying(20),
    country character varying(100) NOT NULL
);


ALTER TABLE public.organizations;

--
-- Name: organizations_id_seq; Type: SEQUENCE; Schema: public; Owner: obell
--

CREATE SEQUENCE public.organizations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.organizations_id_seq;

--
-- Name: organizations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: obell
--

ALTER SEQUENCE public.organizations_id_seq OWNED BY public.organizations.id;


--
-- Name: tags; Type: TABLE; Schema: public; Owner: obell
--

CREATE TABLE public.tags (
    id integer NOT NULL,
    tag_name character varying(50) NOT NULL
);


ALTER TABLE public.tags;

--
-- Name: tags_id_seq; Type: SEQUENCE; Schema: public; Owner: obell
--

CREATE SEQUENCE public.tags_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.tags_id_seq;

--
-- Name: tags_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: obell
--

ALTER SEQUENCE public.tags_id_seq OWNED BY public.tags.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: obell
--

CREATE TABLE public.users (
    id integer NOT NULL,
    username character varying(50) NOT NULL,
    first_name character varying(100) NOT NULL,
    last_name character varying(100) NOT NULL,
    email character varying(254) NOT NULL,
    password text NOT NULL,
    profile_image text
);


ALTER TABLE public.users;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: obell
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: obell
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: breeds id; Type: DEFAULT; Schema: public; Owner: obell
--

ALTER TABLE ONLY public.breeds ALTER COLUMN id SET DEFAULT nextval('public.breeds_id_seq'::regclass);


--
-- Name: dogs id; Type: DEFAULT; Schema: public; Owner: obell
--

ALTER TABLE ONLY public.dogs ALTER COLUMN id SET DEFAULT nextval('public.dogs_id_seq'::regclass);


--
-- Name: organizations id; Type: DEFAULT; Schema: public; Owner: obell
--

ALTER TABLE ONLY public.organizations ALTER COLUMN id SET DEFAULT nextval('public.organizations_id_seq'::regclass);


--
-- Name: tags id; Type: DEFAULT; Schema: public; Owner: obell
--

ALTER TABLE ONLY public.tags ALTER COLUMN id SET DEFAULT nextval('public.tags_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: obell
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: breeds; Type: TABLE DATA; Schema: public; Owner: obell
--

COPY public.breeds (id, breed_name) FROM stdin;
279	Labrador Retriever
280	Golden Retriever
281	Bulldog
285	German Shepherd
287	French Bulldog
289	Poodle
290	Beagle
291	Rottweiler
292	German Shorthaired Pointer
293	Yorkshire Terrier
294	Dachshund
295	Boxer
296	Siberian Husky
297	Australian Shepherd
298	Cavalier King Charles Spaniel
299	Doberman Pinscher
300	Great Dane
301	Miniature Schnauzer
302	Shih Tzu
303	Boston Terrier
304	Bernese Mountain Dog
305	Cocker Spaniel
306	Mastiff
307	Pomeranian
308	Havanese
309	English Springer Spaniel
310	Brittany
311	Shetland Sheepdog
312	Chihuahua
313	Basset Hound
\.


--
-- Data for Name: dog_attributes; Type: TABLE DATA; Schema: public; Owner: obell
--

COPY public.dog_attributes (dog_id, spayed_neutered, house_trained, declawed, special_needs, shots_current) FROM stdin;
\.


--
-- Data for Name: dog_tags; Type: TABLE DATA; Schema: public; Owner: obell
--

COPY public.dog_tags (dog_id, tag_id) FROM stdin;
\.


--
-- Data for Name: dogs; Type: TABLE DATA; Schema: public; Owner: obell
--

COPY public.dogs (id, name, location, status, breed_id, age, gender, size, color, coat, description, organization_id, image, video, published_at) FROM stdin;
\.


--
-- Data for Name: organizations; Type: TABLE DATA; Schema: public; Owner: obell
--

COPY public.organizations (id, name, website, phone, email, address, city, state, postcode, country) FROM stdin;
\.


--
-- Data for Name: tags; Type: TABLE DATA; Schema: public; Owner: obell
--

COPY public.tags (id, tag_name) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: obell
--

COPY public.users (id, username, first_name, last_name, email, password, profile_image) FROM stdin;
2	testuser	Test	User	test@example.com	$2b$10$84qZMCB8zrkzg.izDm01..gvAP54lDM.0p.zWcr8ul4kaaHbWw/Ea	\N
4	pet1	pet	uno	pet1@mail.com	$2b$10$O6mGk6KBP1HlMkySJ0kGWumhbCqZvkQBKTBPy5P1O4r2gcD/AniC.	\N
5	olgabernal@email.com	Olga	B	olgabernal@email.com	$2b$10$WKrzv0/5yNThx.Zzn3j3Peh1jb27cZcoMvuee8fuyIb8EgNB/t9X6	\N
6	chat@email.com	Chat	White	chat@email.com	$2b$10$f4VtQ5n5164f.UBXynclF.CZ2IKBqLmhJn1T9WJLuaIXxGCWjMhBS	\N
7	payaso	Paya	So	payaso@mail.com	$2b$10$vcFZpMwmXbuuOONilYv3veCKQpHvqGrBNXaatIK8phLI3D5aRmqVa	\N
8	mia1	mia	una	mia1@mail.com	$2b$10$MH3ZW28Oof15ficEMBo9cOc23h/CYHY8WFH9dQswwkXKOyut7zUqq	\N
9	blanca	Blanca	Gat	blanca@mail.com	$2b$10$F4kFK9TS8Lm6vWTtJaMNuOH4OuzizBrS6Q4ReP5MC2JZ/tD90.xTe	\N
10	cochinica	cochinica	peque	cochinica@mail.com	$2b$10$1XU5YWpmWkEfzUQnvwxAh.qAV01AfZInv7fjpA8X7/YxSNTEIpc5K	\N
11	mueble@mail.com	mue	ble	mueble@mail.com	$2b$10$wlDPPOZxg/Zjt8SsbDrUM.0w3WjA3NEFm4caHxsjeIZB5hFYxO2qS	\N
12	celosica@mail.com	Celo	Sica	celosica@mail.com	$2b$10$TP6XQLOqHz2LEjrUEz3.veLtdz.70xJjI4otePr2xSH74/eKCGv0q	\N
14	negrico	negrico	gatico	negricogatico@mail.com	$2b$10$nU.7eH1RoXb.Q/d7TtSgk.LAC9i2EBKumxVE/UC2pSELFXxCi2dJK	\N
15	peque	Peque	Na	peque@mail.com	$2b$10$NITbwI2pCLEZXj6pFl63qeFy2RBT3EyAXY0e5W2yLSqjIoYVC4PSW	\N
16	gordico1	Gordi	co	gordico@mail.com	$2b$10$ZjDQ89P2ZucUF7u382qm2eLJqp9MnMI99nDNyu5aIgjq.0v7vziIu	\N
17	ratoncico	raton	cico	ratoncico@mail.com	$2b$10$5RfeGef1WD37mqg4Sz5CuOKCs.IiitFT.ZveBk0g3ZckX2por6jCS	\N
19	gatitob	GATIto	peQ	Gatitob@mail.com	$2b$10$mWs2JQklISLIzF3fTmm5YOQ9T.XtXZxz.K5P6drreZV0PCint9UmG	\N
20	billy2	Billy	Second	billy2@mailcom	$2b$10$Y6dF5G2eqNKNq0LhND8fv.nfbofaL2BVKzbtRYVAA70dR2rqr9Ffu	\N
21	mascotas	Mascota	Pet	mascotas@emailcom	$2b$10$mDRCeNK3OExapOjMPujjhuSMdYjSa11HhGP4Slj17Ss8vGkH7o.PW	\N
22	mascotas1	Macotas	Uno	mascotas1@mail.com	$2b$10$MV0.Y88EgYJvy3ZrD4AeVeINBh3ASShzK070txru.YivoHpFLcryy	\N
23	mas	Mascotas	Dos	mas@email.com	$2b$10$a3ia.hM2BuoinYtar/GoW.WKfKTr//QuSOiEAgflugcvsozUVW2mO	\N
24	mas-test	Mascot	Otra	mas-test@email.com	$2b$10$PfOgUGqsvBQ/CN1jNSbojOLaFOrHg4BWRmprLmQbL8aBYTyN/cv12	\N
25	mas-different	Mas	Test	mas-different@email.com	$2b$10$yFfr7160SmzRWrXsrjS2rOEj6.ppHueNt2k5OK/zCDNsRk90nhCIu	\N
26	mas-diff	Mas	Diff	masdif@mail.com	$2b$10$a9vVOEp8rVHSpv0nW1YdnewP/OqDGD5A/O/EZ64F6/CKR4Uoi9yxy	\N
27	mas-d	mas	d	mas-d@mail.com	$2b$10$4ep4Rj/Y8xTY.enrlZCiK.bxeXbEHeZT/vPPo25lL/QN8.9PEXxWG	\N
28	mas-dd	Ma	D	mas-dd@email.com	$2b$10$x0gxZTxvPb7R3s9cedZvbeo0JNyadC3LJSMkSRWeqTuCBJV2s41Pm	\N
29	mas-ddd	mas	pe	mas-ddd@email.com	$2b$10$WFmHeUzyFqYvimOMe4WEcexpBceh1r02FqceaZpT8ZsNZUPIWpyHy	\N
30	mascotas3	Mac	Scotas	mascotas3@email.com	$2b$10$uGuBygCc96Nzau3wdLuob.vUnpJ742GpzqEi5t4dIQDuhtZE.bI1S	\N
42	rito6	Rita	Far	ritomail@mail.com	$2b$10$sGcGYBoE3Wpj9N/KvRyzJe.JZ.7HfhYv33Cf3hciS4oiRIV80u9.G	\N
43	rita6	Rita	Perez	rito6@mail.com	$2b$10$QvKK8Ov0EHfWakAnUJjW0eQAI7THNIg9kRnOF5rrH57fMgcY8VHvi	\N
33	mascota	Mas	Cotas	mascotas@email.com	$2b$10$d.GGhW5ZZYuHdR9LR/okvu7bzHj/wqNLDI1EPyh348zZAYDNKSUKu	\N
44	mentirillas	Mentiri	Llas	mentirillas@mail.com	$2b$10$H..S9eYrVuYP2Uw6Y2WK2.53mnEA/sIxiQuXPnOtP0uCrob59iccK	\N
45	mentirijilla	Menti	Rijilla	mentirijilla@mail.com	$2b$10$HiWc6c2szq6vU.OElf5P7Oq/BovfQnVCvxQUl56wdvunEzocz.QfG	\N
3	TEST	Testx	Zero	test@mail.com	$2b$10$E6T0K3WLjfDASNEmcwOobuXigHsflV4f2rLJqxAOIRX.6HVjvqm.S	\N
47	funziona	Fun	Ziona	funziona@mail.com	$2b$10$p7GgHp4Oxamr3871DxBaeuvIvtTJLvJLMW3hRyS9pAk25coHxXDtS	\N
38	@rojo54	rojoa	intenso	rojomail@mail.com	$2b$10$vp4NXtCBMdb4p2XNJaNYdOQIQ1aFllyLLAdOATTta4tFFhf9IEdlC	\N
40	caperucita2	Caperucita	Roja	caperucita@mail.com	$2b$10$nUT8S/4BmT09htjyAaq0Zegl6AGLpG5V8o.YD.qN9YsPDVcRpuEoS	\N
41	capu22	Capucietto	Rosso	capucietto@mail.com	$2b$10$greMiHu7RU3Yoq495Zi0u.5Gs5a4SvCtnQ1CIDeRHGvdsL1qfSk5O	\N
\.


--
-- Name: breeds_id_seq; Type: SEQUENCE SET; Schema: public; Owner: obell
--

SELECT pg_catalog.setval('public.breeds_id_seq', 313, true);


--
-- Name: dogs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: obell
--

SELECT pg_catalog.setval('public.dogs_id_seq', 1, false);


--
-- Name: organizations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: obell
--

SELECT pg_catalog.setval('public.organizations_id_seq', 1, false);


--
-- Name: tags_id_seq; Type: SEQUENCE SET; Schema: public; Owner: obell
--

SELECT pg_catalog.setval('public.tags_id_seq', 1, false);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: obell
--

SELECT pg_catalog.setval('public.users_id_seq', 48, true);


--
-- Name: breeds breeds_breed_name_key; Type: CONSTRAINT; Schema: public; Owner: obell
--

ALTER TABLE ONLY public.breeds
    ADD CONSTRAINT breeds_breed_name_key UNIQUE (breed_name);


--
-- Name: breeds breeds_pkey; Type: CONSTRAINT; Schema: public; Owner: obell
--

ALTER TABLE ONLY public.breeds
    ADD CONSTRAINT breeds_pkey PRIMARY KEY (id);


--
-- Name: dog_attributes dog_attributes_pkey; Type: CONSTRAINT; Schema: public; Owner: obell
--

ALTER TABLE ONLY public.dog_attributes
    ADD CONSTRAINT dog_attributes_pkey PRIMARY KEY (dog_id);


--
-- Name: dog_tags dog_tags_pkey; Type: CONSTRAINT; Schema: public; Owner: obell
--

ALTER TABLE ONLY public.dog_tags
    ADD CONSTRAINT dog_tags_pkey PRIMARY KEY (dog_id, tag_id);


--
-- Name: dogs dogs_pkey; Type: CONSTRAINT; Schema: public; Owner: obell
--

ALTER TABLE ONLY public.dogs
    ADD CONSTRAINT dogs_pkey PRIMARY KEY (id);


--
-- Name: organizations organizations_email_key; Type: CONSTRAINT; Schema: public; Owner: obell
--

ALTER TABLE ONLY public.organizations
    ADD CONSTRAINT organizations_email_key UNIQUE (email);


--
-- Name: organizations organizations_pkey; Type: CONSTRAINT; Schema: public; Owner: obell
--

ALTER TABLE ONLY public.organizations
    ADD CONSTRAINT organizations_pkey PRIMARY KEY (id);


--
-- Name: tags tags_pkey; Type: CONSTRAINT; Schema: public; Owner: obell
--

ALTER TABLE ONLY public.tags
    ADD CONSTRAINT tags_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: obell
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: obell
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: obell
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- Name: dog_attributes dog_attributes_dog_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: obell
--

ALTER TABLE ONLY public.dog_attributes
    ADD CONSTRAINT dog_attributes_dog_id_fkey FOREIGN KEY (dog_id) REFERENCES public.dogs(id) ON DELETE CASCADE;


--
-- Name: dog_tags dog_tags_dog_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: obell
--

ALTER TABLE ONLY public.dog_tags
    ADD CONSTRAINT dog_tags_dog_id_fkey FOREIGN KEY (dog_id) REFERENCES public.dogs(id) ON DELETE CASCADE;


--
-- Name: dog_tags dog_tags_tag_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: obell
--

ALTER TABLE ONLY public.dog_tags
    ADD CONSTRAINT dog_tags_tag_id_fkey FOREIGN KEY (tag_id) REFERENCES public.tags(id) ON DELETE CASCADE;


--
-- Name: dogs dogs_breed_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: obell
--

ALTER TABLE ONLY public.dogs
    ADD CONSTRAINT dogs_breed_id_fkey FOREIGN KEY (breed_id) REFERENCES public.breeds(id) ON DELETE CASCADE;


--
-- Name: dogs dogs_organization_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: obell
--

ALTER TABLE ONLY public.dogs
    ADD CONSTRAINT dogs_organization_id_fkey FOREIGN KEY (organization_id) REFERENCES public.organizations(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

