--
-- PostgreSQL database dump
--

-- Dumped from database version 9.4.5
-- Dumped by pg_dump version 9.4.5
-- Started on 2016-11-05 23:51:56 EDT

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;

--
-- TOC entry 192 (class 3079 OID 11861)
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- TOC entry 2089 (class 0 OID 0)
-- Dependencies: 192
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- TOC entry 180 (class 1259 OID 55716)
-- Name: client_list; Type: TABLE; Schema: public; Owner: -; Tablespace: 
--

CREATE TABLE client_list (
    cli_lis_id integer NOT NULL,
    cli_lis_name character(45),
    cli_lis_avaliable boolean
);


--
-- TOC entry 2090 (class 0 OID 0)
-- Dependencies: 180
-- Name: TABLE client_list; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON TABLE client_list IS 'Manage all client names registered ';


--
-- TOC entry 179 (class 1259 OID 55714)
-- Name: client_list_cli_lis_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE client_list_cli_lis_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 2091 (class 0 OID 0)
-- Dependencies: 179
-- Name: client_list_cli_lis_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE client_list_cli_lis_id_seq OWNED BY client_list.cli_lis_id;


--
-- TOC entry 189 (class 1259 OID 55789)
-- Name: law_detail; Type: TABLE; Schema: public; Owner: -; Tablespace: 
--

CREATE TABLE law_detail (
    law_det_id integer NOT NULL,
    law_det_name character(200),
    law_det_date date,
    law_gaceta_number character(20),
    law_det_type integer,
    law_file_id integer
);


--
-- TOC entry 2092 (class 0 OID 0)
-- Dependencies: 189
-- Name: TABLE law_detail; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON TABLE law_detail IS 'Storage for laws titles';


--
-- TOC entry 188 (class 1259 OID 55787)
-- Name: law_detail_law_det_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE law_detail_law_det_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 2093 (class 0 OID 0)
-- Dependencies: 188
-- Name: law_detail_law_det_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE law_detail_law_det_id_seq OWNED BY law_detail.law_det_id;


--
-- TOC entry 191 (class 1259 OID 55797)
-- Name: law_type; Type: TABLE; Schema: public; Owner: -; Tablespace: 
--

CREATE TABLE law_type (
    law_type_id integer NOT NULL,
    law_type_name character(20),
    law_type_avaliable boolean
);


--
-- TOC entry 2094 (class 0 OID 0)
-- Dependencies: 191
-- Name: TABLE law_type; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON TABLE law_type IS 'storage for laws types';


--
-- TOC entry 190 (class 1259 OID 55795)
-- Name: law_type_law_type_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE law_type_law_type_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 2095 (class 0 OID 0)
-- Dependencies: 190
-- Name: law_type_law_type_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE law_type_law_type_id_seq OWNED BY law_type.law_type_id;


--
-- TOC entry 177 (class 1259 OID 55703)
-- Name: news_category; Type: TABLE; Schema: public; Owner: -; Tablespace: 
--

CREATE TABLE news_category (
    news_cat_id integer NOT NULL,
    news_cat_name character(20),
    news_cat_avaliable boolean
);


--
-- TOC entry 2096 (class 0 OID 0)
-- Dependencies: 177
-- Name: TABLE news_category; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON TABLE news_category IS 'Store list of categorys avaliables to load news information';


--
-- TOC entry 178 (class 1259 OID 55706)
-- Name: news_category_news_cat_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE news_category_news_cat_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 2097 (class 0 OID 0)
-- Dependencies: 178
-- Name: news_category_news_cat_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE news_category_news_cat_id_seq OWNED BY news_category.news_cat_id;


--
-- TOC entry 173 (class 1259 OID 47442)
-- Name: news_detail; Type: TABLE; Schema: public; Owner: -; Tablespace: 
--

CREATE TABLE news_detail (
    news_det_id integer NOT NULL,
    news_det_text text,
    news_det_date date,
    news_det_source text,
    news_det_text_en text,
    news_det_tit text,
    news_det_tit_en text,
    news_det_category integer,
    news_det_priority double precision,
    news_det_image text
);


--
-- TOC entry 2098 (class 0 OID 0)
-- Dependencies: 173
-- Name: TABLE news_detail; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON TABLE news_detail IS 'Store news detail';


--
-- TOC entry 2099 (class 0 OID 0)
-- Dependencies: 173
-- Name: COLUMN news_detail.news_det_text; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN news_detail.news_det_text IS 'Spanish news text';


--
-- TOC entry 2100 (class 0 OID 0)
-- Dependencies: 173
-- Name: COLUMN news_detail.news_det_source; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN news_detail.news_det_source IS 'url news';


--
-- TOC entry 2101 (class 0 OID 0)
-- Dependencies: 173
-- Name: COLUMN news_detail.news_det_text_en; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN news_detail.news_det_text_en IS 'English text news';


--
-- TOC entry 2102 (class 0 OID 0)
-- Dependencies: 173
-- Name: COLUMN news_detail.news_det_tit; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN news_detail.news_det_tit IS 'Spanish title';


--
-- TOC entry 2103 (class 0 OID 0)
-- Dependencies: 173
-- Name: COLUMN news_detail.news_det_tit_en; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN news_detail.news_det_tit_en IS 'English title';


--
-- TOC entry 2104 (class 0 OID 0)
-- Dependencies: 173
-- Name: COLUMN news_detail.news_det_category; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN news_detail.news_det_category IS 'id category';


--
-- TOC entry 172 (class 1259 OID 47440)
-- Name: news_detail_nd_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE news_detail_nd_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 2105 (class 0 OID 0)
-- Dependencies: 172
-- Name: news_detail_nd_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE news_detail_nd_id_seq OWNED BY news_detail.news_det_id;


--
-- TOC entry 182 (class 1259 OID 55740)
-- Name: news_files; Type: TABLE; Schema: public; Owner: -; Tablespace: 
--

CREATE TABLE news_files (
    news_file_id integer NOT NULL,
    news_file_name character(20),
    news_file_archive text
);


--
-- TOC entry 2106 (class 0 OID 0)
-- Dependencies: 182
-- Name: TABLE news_files; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON TABLE news_files IS 'Store all file''s data';


--
-- TOC entry 185 (class 1259 OID 55753)
-- Name: news_files_news; Type: TABLE; Schema: public; Owner: -; Tablespace: 
--

CREATE TABLE news_files_news (
    news_files_news_id integer NOT NULL,
    news_files_id integer,
    news_news_id integer NOT NULL
);


--
-- TOC entry 2107 (class 0 OID 0)
-- Dependencies: 185
-- Name: TABLE news_files_news; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON TABLE news_files_news IS 'Join between files and news';


--
-- TOC entry 181 (class 1259 OID 55738)
-- Name: news_files_news_file_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE news_files_news_file_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 2108 (class 0 OID 0)
-- Dependencies: 181
-- Name: news_files_news_file_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE news_files_news_file_id_seq OWNED BY news_files.news_file_id;


--
-- TOC entry 183 (class 1259 OID 55749)
-- Name: news_files_news_news_files_news_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE news_files_news_news_files_news_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 2109 (class 0 OID 0)
-- Dependencies: 183
-- Name: news_files_news_news_files_news_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE news_files_news_news_files_news_id_seq OWNED BY news_files_news.news_files_news_id;


--
-- TOC entry 184 (class 1259 OID 55751)
-- Name: news_files_news_news_news_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE news_files_news_news_news_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 2110 (class 0 OID 0)
-- Dependencies: 184
-- Name: news_files_news_news_news_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE news_files_news_news_news_id_seq OWNED BY news_files_news.news_news_id;


--
-- TOC entry 187 (class 1259 OID 55772)
-- Name: news_type; Type: TABLE; Schema: public; Owner: -; Tablespace: 
--

CREATE TABLE news_type (
    news_type_id integer NOT NULL,
    news_type_name character(20),
    news_type_avaliable boolean
);


--
-- TOC entry 2111 (class 0 OID 0)
-- Dependencies: 187
-- Name: TABLE news_type; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON TABLE news_type IS 'Store type of charge information';


--
-- TOC entry 186 (class 1259 OID 55770)
-- Name: news_type_news_type_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE news_type_news_type_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 2112 (class 0 OID 0)
-- Dependencies: 186
-- Name: news_type_news_type_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE news_type_news_type_id_seq OWNED BY news_type.news_type_id;


--
-- TOC entry 175 (class 1259 OID 47469)
-- Name: users_details; Type: TABLE; Schema: public; Owner: -; Tablespace: 
--

CREATE TABLE users_details (
    user_inf_id integer NOT NULL,
    user_inf_full_name character(45),
    "user_inf_national_ID" character(20),
    user_inf_mail character(45),
    user_inf_login character(20),
    user_inf_password bigint NOT NULL
);


--
-- TOC entry 174 (class 1259 OID 47467)
-- Name: users_user_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE users_user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 2113 (class 0 OID 0)
-- Dependencies: 174
-- Name: users_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE users_user_id_seq OWNED BY users_details.user_inf_id;


--
-- TOC entry 176 (class 1259 OID 47475)
-- Name: users_user_password_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE users_user_password_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 2114 (class 0 OID 0)
-- Dependencies: 176
-- Name: users_user_password_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE users_user_password_seq OWNED BY users_details.user_inf_password;


--
-- TOC entry 1943 (class 2604 OID 55719)
-- Name: cli_lis_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY client_list ALTER COLUMN cli_lis_id SET DEFAULT nextval('client_list_cli_lis_id_seq'::regclass);


--
-- TOC entry 1948 (class 2604 OID 55792)
-- Name: law_det_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY law_detail ALTER COLUMN law_det_id SET DEFAULT nextval('law_detail_law_det_id_seq'::regclass);


--
-- TOC entry 1949 (class 2604 OID 55800)
-- Name: law_type_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY law_type ALTER COLUMN law_type_id SET DEFAULT nextval('law_type_law_type_id_seq'::regclass);


--
-- TOC entry 1942 (class 2604 OID 55708)
-- Name: news_cat_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY news_category ALTER COLUMN news_cat_id SET DEFAULT nextval('news_category_news_cat_id_seq'::regclass);


--
-- TOC entry 1939 (class 2604 OID 47445)
-- Name: news_det_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY news_detail ALTER COLUMN news_det_id SET DEFAULT nextval('news_detail_nd_id_seq'::regclass);


--
-- TOC entry 1944 (class 2604 OID 55743)
-- Name: news_file_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY news_files ALTER COLUMN news_file_id SET DEFAULT nextval('news_files_news_file_id_seq'::regclass);


--
-- TOC entry 1945 (class 2604 OID 55756)
-- Name: news_files_news_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY news_files_news ALTER COLUMN news_files_news_id SET DEFAULT nextval('news_files_news_news_files_news_id_seq'::regclass);


--
-- TOC entry 1946 (class 2604 OID 55757)
-- Name: news_news_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY news_files_news ALTER COLUMN news_news_id SET DEFAULT nextval('news_files_news_news_news_id_seq'::regclass);


--
-- TOC entry 1947 (class 2604 OID 55775)
-- Name: news_type_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY news_type ALTER COLUMN news_type_id SET DEFAULT nextval('news_type_news_type_id_seq'::regclass);


--
-- TOC entry 1940 (class 2604 OID 47472)
-- Name: user_inf_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY users_details ALTER COLUMN user_inf_id SET DEFAULT nextval('users_user_id_seq'::regclass);


--
-- TOC entry 1941 (class 2604 OID 47477)
-- Name: user_inf_password; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY users_details ALTER COLUMN user_inf_password SET DEFAULT nextval('users_user_password_seq'::regclass);


--
-- TOC entry 1957 (class 2606 OID 55721)
-- Name: client_list_pkey; Type: CONSTRAINT; Schema: public; Owner: -; Tablespace: 
--

ALTER TABLE ONLY client_list
    ADD CONSTRAINT client_list_pkey PRIMARY KEY (cli_lis_id);


--
-- TOC entry 1965 (class 2606 OID 55794)
-- Name: law_detail_pkey; Type: CONSTRAINT; Schema: public; Owner: -; Tablespace: 
--

ALTER TABLE ONLY law_detail
    ADD CONSTRAINT law_detail_pkey PRIMARY KEY (law_det_id);


--
-- TOC entry 1967 (class 2606 OID 55802)
-- Name: law_type_pkey; Type: CONSTRAINT; Schema: public; Owner: -; Tablespace: 
--

ALTER TABLE ONLY law_type
    ADD CONSTRAINT law_type_pkey PRIMARY KEY (law_type_id);


--
-- TOC entry 1955 (class 2606 OID 55713)
-- Name: news_category_pkey; Type: CONSTRAINT; Schema: public; Owner: -; Tablespace: 
--

ALTER TABLE ONLY news_category
    ADD CONSTRAINT news_category_pkey PRIMARY KEY (news_cat_id);


--
-- TOC entry 1951 (class 2606 OID 47450)
-- Name: news_detail_pkey; Type: CONSTRAINT; Schema: public; Owner: -; Tablespace: 
--

ALTER TABLE ONLY news_detail
    ADD CONSTRAINT news_detail_pkey PRIMARY KEY (news_det_id);


--
-- TOC entry 1961 (class 2606 OID 55759)
-- Name: news_files_news_pkey; Type: CONSTRAINT; Schema: public; Owner: -; Tablespace: 
--

ALTER TABLE ONLY news_files_news
    ADD CONSTRAINT news_files_news_pkey PRIMARY KEY (news_files_news_id);


--
-- TOC entry 1959 (class 2606 OID 55748)
-- Name: news_files_pkey; Type: CONSTRAINT; Schema: public; Owner: -; Tablespace: 
--

ALTER TABLE ONLY news_files
    ADD CONSTRAINT news_files_pkey PRIMARY KEY (news_file_id);


--
-- TOC entry 1963 (class 2606 OID 55777)
-- Name: news_type_pkey; Type: CONSTRAINT; Schema: public; Owner: -; Tablespace: 
--

ALTER TABLE ONLY news_type
    ADD CONSTRAINT news_type_pkey PRIMARY KEY (news_type_id);


--
-- TOC entry 1953 (class 2606 OID 47474)
-- Name: users_pkey; Type: CONSTRAINT; Schema: public; Owner: -; Tablespace: 
--

ALTER TABLE ONLY users_details
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_inf_id);


--
-- TOC entry 1972 (class 2606 OID 55808)
-- Name: law_detail_law_file_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY law_detail
    ADD CONSTRAINT law_detail_law_file_id_fkey FOREIGN KEY (law_file_id) REFERENCES news_files(news_file_id);


--
-- TOC entry 1971 (class 2606 OID 55803)
-- Name: law_detail_law_type_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY law_detail
    ADD CONSTRAINT law_detail_law_type_fkey FOREIGN KEY (law_det_type) REFERENCES law_type(law_type_id);


--
-- TOC entry 1968 (class 2606 OID 55727)
-- Name: news_detail_news_det_category_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY news_detail
    ADD CONSTRAINT news_detail_news_det_category_fkey FOREIGN KEY (news_det_category) REFERENCES news_category(news_cat_id);


--
-- TOC entry 1970 (class 2606 OID 55765)
-- Name: news_files_news_news_files_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY news_files_news
    ADD CONSTRAINT news_files_news_news_files_id_fkey FOREIGN KEY (news_files_id) REFERENCES news_files(news_file_id);


--
-- TOC entry 1969 (class 2606 OID 55760)
-- Name: news_files_news_news_news_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY news_files_news
    ADD CONSTRAINT news_files_news_news_news_id_fkey FOREIGN KEY (news_news_id) REFERENCES news_detail(news_det_id);


--
-- TOC entry 2088 (class 0 OID 0)
-- Dependencies: 5
-- Name: public; Type: ACL; Schema: -; Owner: -
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM postgres;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;


-- Completed on 2016-11-05 23:51:57 EDT

--
-- PostgreSQL database dump complete
--

