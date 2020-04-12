-- phpMyAdmin SQL Dump
-- version 4.6.5.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Creato il: Apr 23, 2017 alle 10:44
-- Versione del server: 10.1.21-MariaDB
-- Versione PHP: 5.6.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `affectiveimage`
--

-- --------------------------------------------------------

--
-- Struttura della tabella `risultati`
--

CREATE TABLE `risultati` (
  `Nt` text COLLATE ascii_bin NOT NULL,
  `nom` text COLLATE ascii_bin NOT NULL,
  `cog` text COLLATE ascii_bin NOT NULL,
  `et` int(11) NOT NULL,
  `ses` text COLLATE ascii_bin NOT NULL,
  `mt1` text COLLATE ascii_bin NOT NULL,
  `mt1s` int(11) NOT NULL,
  `mt1r` int(11) NOT NULL,
  `mt2` text COLLATE ascii_bin NOT NULL,
  `mt2s` float NOT NULL,
  `mt2r` float NOT NULL,
  `a` text COLLATE ascii_bin NOT NULL,
  `b` int(11) NOT NULL,
  `c` int(11) NOT NULL,
  `d` text COLLATE ascii_bin NOT NULL,
  `e` int(11) NOT NULL,
  `f` int(11) NOT NULL,
  `g` text COLLATE ascii_bin NOT NULL,
  `h` int(11) NOT NULL,
  `i` int(11) NOT NULL,
  `j` text COLLATE ascii_bin NOT NULL,
  `k` int(11) NOT NULL,
  `l` int(11) NOT NULL,
  `m` text COLLATE ascii_bin NOT NULL,
  `n` int(11) NOT NULL,
  `p` int(11) NOT NULL,
  `q` text COLLATE ascii_bin NOT NULL,
  `r` int(11) NOT NULL,
  `s` int(11) NOT NULL,
  `t` text COLLATE ascii_bin NOT NULL,
  `u` int(11) NOT NULL,
  `v` int(11) NOT NULL,
  `w` text COLLATE ascii_bin NOT NULL,
  `x` int(11) NOT NULL,
  `y` int(11) NOT NULL,
  `z` text COLLATE ascii_bin NOT NULL,
  `a1` int(11) NOT NULL,
  `b1` int(11) NOT NULL,
  `c1` text COLLATE ascii_bin NOT NULL,
  `d1` int(11) NOT NULL,
  `e1` int(11) NOT NULL,
  `g1` text COLLATE ascii_bin NOT NULL,
  `h1` int(11) NOT NULL,
  `i1` int(11) NOT NULL,
  `j1` text COLLATE ascii_bin NOT NULL,
  `k1` int(11) NOT NULL,
  `l1` int(11) NOT NULL,
  `m1` text COLLATE ascii_bin NOT NULL,
  `n1` int(11) NOT NULL,
  `o1` int(11) NOT NULL,
  `p1` text COLLATE ascii_bin NOT NULL,
  `q1` int(11) NOT NULL,
  `r1` int(11) NOT NULL,
  `s1` text COLLATE ascii_bin NOT NULL,
  `t1` int(11) NOT NULL,
  `v1` int(11) NOT NULL,
  `w1` text COLLATE ascii_bin NOT NULL,
  `x1` int(11) NOT NULL,
  `y1` int(11) NOT NULL,
  `z1` text COLLATE ascii_bin NOT NULL,
  `a2` int(11) NOT NULL,
  `b2` int(11) NOT NULL,
  `c2` text COLLATE ascii_bin NOT NULL,
  `d2` int(11) NOT NULL,
  `e2` int(11) NOT NULL,
  `f2` text COLLATE ascii_bin NOT NULL,
  `g2` int(11) NOT NULL,
  `h2` int(11) NOT NULL,
  `i2` text COLLATE ascii_bin NOT NULL,
  `j2` int(11) NOT NULL,
  `k2` int(11) NOT NULL,
  `l2` text COLLATE ascii_bin NOT NULL,
  `m2` int(11) NOT NULL,
  `n2` int(11) NOT NULL,
  `o2` text COLLATE ascii_bin NOT NULL,
  `p2` int(11) NOT NULL,
  `q2` int(11) NOT NULL,
  `r2` text COLLATE ascii_bin NOT NULL,
  `s2` int(11) NOT NULL,
  `t2` int(11) NOT NULL,
  `u2` text COLLATE ascii_bin NOT NULL,
  `v2` int(11) NOT NULL,
  `w2` int(11) NOT NULL,
  `x2` text COLLATE ascii_bin NOT NULL,
  `y2` int(11) NOT NULL,
  `z2` int(11) NOT NULL,
  `a3` text COLLATE ascii_bin NOT NULL,
  `b3` int(11) NOT NULL,
  `c3` int(11) NOT NULL,
  `d3` text COLLATE ascii_bin NOT NULL,
  `e3` int(11) NOT NULL,
  `f3` int(11) NOT NULL,
  `g3` text COLLATE ascii_bin NOT NULL,
  `h3` int(11) NOT NULL,
  `i3` int(11) NOT NULL,
  `j3` text COLLATE ascii_bin NOT NULL,
  `k3` int(11) NOT NULL,
  `l3` int(11) NOT NULL,
  `m3` text COLLATE ascii_bin NOT NULL,
  `n3` int(11) NOT NULL,
  `o3` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=ascii COLLATE=ascii_bin;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
