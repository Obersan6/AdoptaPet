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

--
-- Data for Name: breeds; Type: TABLE DATA; Schema: public; Owner: obell
--

COPY public.breeds (id, breed_name) FROM stdin;
279	Labrador Retriever
280	Golden Retriever
281	Bulldog
\.


--
-- Data for Name: organizations; Type: TABLE DATA; Schema: public; Owner: obell
--

COPY public.organizations (id, name, website, phone, email, address, city, state, postcode, country) FROM stdin;
\.


--
-- Data for Name: dogs; Type: TABLE DATA; Schema: public; Owner: obell
--

COPY public.dogs (id, name, location, status, breed_id, age, gender, size, color, coat, description, organization_id, image, video, published_at) FROM stdin;
\.


--
-- Data for Name: dog_attributes; Type: TABLE DATA; Schema: public; Owner: obell
--

COPY public.dog_attributes (dog_id, spayed_neutered, house_trained, declawed, special_needs, shots_current) FROM stdin;
\.


--
-- Data for Name: tags; Type: TABLE DATA; Schema: public; Owner: obell
--

COPY public.tags (id, tag_name) FROM stdin;
\.


--
-- Data for Name: dog_tags; Type: TABLE DATA; Schema: public; Owner: obell
--

COPY public.dog_tags (dog_id, tag_id) FROM stdin;
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
-- Data for Name: user_favorites; Type: TABLE DATA; Schema: public; Owner: obell
--

COPY public.user_favorites (user_id, dog_id) FROM stdin;
\.


--
-- Name: breeds_id_seq; Type: SEQUENCE SET; Schema: public; Owner: obell
--

SELECT pg_catalog.setval('public.breeds_id_seq', 281, true);


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
-- PostgreSQL database dump complete
--

