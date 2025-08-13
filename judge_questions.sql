-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- 主機： 127.0.0.1
-- 產生時間： 2025-08-03 05:55:12
-- 伺服器版本： 10.4.28-MariaDB
-- PHP 版本： 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 資料庫： `judge_questions`
--

-- --------------------------------------------------------

--
-- 資料表結構 `example`
--

CREATE TABLE `example` (
  `id` int(11) NOT NULL,
  `Input` text NOT NULL,
  `Output` text NOT NULL,
  `q_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 傾印資料表的資料 `example`
--

INSERT INTO `example` (`id`, `Input`, `Output`, `q_id`) VALUES
(1, 'world', 'hello, world', 1),
(2, '5 10', '15', 2),
(3, 'angel', 'hello, angel', 1),
(4, '-1 -1', '-2', 2);

-- --------------------------------------------------------

--
-- 資料表結構 `lable`
--

CREATE TABLE `lable` (
  `id` int(11) NOT NULL,
  `Name` enum('Basic Concepts','Data Type','Operation','input and output','front end processor','flow control','loop','array','string','function','pointer','pointer and function') NOT NULL,
  `q_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 傾印資料表的資料 `lable`
--

INSERT INTO `lable` (`id`, `Name`, `q_id`) VALUES
(1, 'Basic Concepts', 1),
(2, 'input and output', 1);

-- --------------------------------------------------------

--
-- 資料表結構 `questions`
--

CREATE TABLE `questions` (
  `id` int(11) NOT NULL,
  `no` int(11) NOT NULL,
  `name` text NOT NULL,
  `info` text NOT NULL,
  `Input_info` text NOT NULL,
  `Output_info` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 傾印資料表的資料 `questions`
--

INSERT INTO `questions` (`id`, `no`, `name`, `info`, `Input_info`, `Output_info`) VALUES
(1, 1, '輸入', '學習所有程式語言的第一個練習題：請寫一個程式，可以讀入指定的字串，並且輸出指定的字串。例如：輸入字串 \"world\"，則請輸出 \"hello, world\"。', '輸入總共一行，內含一組文字', '輸出題目指定的文字。'),
(2, 2, '找出和', '請寫一個程式，讀入兩個數字，並求出它們的和。', '每組輸入共一行，內含有兩個整數 a, b，以空白隔開，a, b絕對值皆小於10的6次方。', '對於每組輸入，輸出該兩整數的和。');

-- --------------------------------------------------------

--
-- 資料表結構 `test`
--

CREATE TABLE `test` (
  `id` int(11) NOT NULL,
  `Input` text NOT NULL,
  `Output` text NOT NULL,
  `q_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 傾印資料表的資料 `test`
--

INSERT INTO `test` (`id`, `Input`, `Output`, `q_id`) VALUES
(1, '123', 'hello, 123', 1),
(2, '************', 'hello, ************', 1),
(3, 'abc', 'hello, abc', 1),
(4, '5 10', '15', 2),
(5, '123 123', '246', 2),
(6, '11111 -11111', '0', 2),
(7, '-1234 -1234', '-2468', 2);

-- --------------------------------------------------------

--
-- 資料表結構 `user`
--

CREATE TABLE `user` (
  `uid` int(8) UNSIGNED NOT NULL,
  `usrname` varchar(255) DEFAULT NULL,
  `pwd` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `usr_group` enum('user','admin') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 傾印資料表的資料 `user`
--

INSERT INTO `user` (`uid`, `usrname`, `pwd`, `email`, `usr_group`) VALUES
(1, 'admin', 'admin', 'admin123@gmail.com', 'admin'),
(2, 'student1', 'sdfg1234', 'test1@gmail.com', 'user');

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `example`
--
ALTER TABLE `example`
  ADD PRIMARY KEY (`id`);

--
-- 資料表索引 `lable`
--
ALTER TABLE `lable`
  ADD PRIMARY KEY (`id`);

--
-- 資料表索引 `questions`
--
ALTER TABLE `questions`
  ADD PRIMARY KEY (`id`);

--
-- 資料表索引 `test`
--
ALTER TABLE `test`
  ADD PRIMARY KEY (`id`);

--
-- 資料表索引 `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`uid`),
  ADD UNIQUE KEY `usrname` (`usrname`),
  ADD UNIQUE KEY `email` (`email`);

--
-- 在傾印的資料表使用自動遞增(AUTO_INCREMENT)
--

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `example`
--
ALTER TABLE `example`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `lable`
--
ALTER TABLE `lable`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `questions`
--
ALTER TABLE `questions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `test`
--
ALTER TABLE `test`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `user`
--
ALTER TABLE `user`
  MODIFY `uid` int(8) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
