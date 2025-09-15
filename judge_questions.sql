-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- 主機： 127.0.0.1
-- 產生時間： 2025-09-14 09:53:59
-- 伺服器版本： 10.4.32-MariaDB
-- PHP 版本： 8.2.12

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
-- 資料表結構 `chat`
--

CREATE TABLE `chat` (
  `c_id` int(11) NOT NULL,
  `message` text NOT NULL,
  `u_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 傾印資料表的資料 `chat`
--

INSERT INTO `chat` (`c_id`, `message`, `u_id`) VALUES
(1, 'test db', 1);

-- --------------------------------------------------------

--
-- 資料表結構 `code`
--

CREATE TABLE `code` (
  `code_id` int(11) NOT NULL,
  `code` text NOT NULL,
  `q_id` int(11) NOT NULL,
  `u_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 傾印資料表的資料 `code`
--

INSERT INTO `code` (`code_id`, `code`, `q_id`, `u_id`) VALUES
(1, '#include<stdio.h>\r\n#include<stdlib.h>\r\n\r\nint main(){\r\n    char name[100];\r\n    scanf(\"%s\", name);\r\n    printf(\"hello, %s\", name);\r\n    //from db\r\n    return 0;\r\n}', 1, 1);

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
(2, 2, '找出和', '請寫一個程式，讀入兩個數字，並求出它們的和。', '每組輸入共一行，內含有兩個整數 a, b，以空白隔開，a, b絕對值皆小於10的6次方。', '對於每組輸入，輸出該兩整數的和。'),
(3, 3, '最大值', '請寫一個程式，讀入三個整數，並輸出其中的最大值。', '輸入共一行，包含三個整數。', '輸出三個整數中的最大值。'),
(4, 4, '平方數', '請寫一個程式，讀入一個整數，輸出它的平方。', '輸入共一行，一個整數 n。', '輸出 n 的平方。'),
(5, 5, '奇偶數判斷', '判斷輸入的整數是奇數還是偶數。', '輸入一個整數。', '輸出 odd 或 even。'),
(6, 6, '正負數判斷', '判斷輸入的整數是正數、負數或零。', '輸入一個整數。', '輸出 positive、negative 或 zero。'),
(7, 7, '簡單加總', '計算 1 到 n 的總和。', '輸入一個整數 n (n > 0)。', '輸出 1+2+…+n 的結果。'),
(8, 8, '九九乘法表', '輸出 1 到 9 的乘法表。', '無輸入。', '輸出九九乘法表。'),
(9, 9, '階乘', '計算輸入整數的階乘。', '輸入一個整數 n (0 <= n <= 12)。', '輸出 n!。'),
(10, 10, '費氏數列', '輸出費氏數列的前 n 項。', '輸入一個整數 n。', '輸出費氏數列前 n 項。'),
(11, 11, '質數判斷', '判斷一個數是否為質數。', '輸入一個整數 n。', '輸出 prime 或 not prime。'),
(12, 12, '區間內質數', '列印區間內所有質數。', '輸入兩個整數 a, b。', '輸出 a 到 b 之間的所有質數。'),
(13, 13, '迴文判斷', '判斷一個字串是否為迴文。', '輸入一個字串。', '輸出 yes 或 no。'),
(14, 14, '字元統計', '統計字串中出現的字元數。', '輸入一個字串。', '輸出字串長度。'),
(15, 15, '字元轉換', '將小寫字母轉成大寫。', '輸入一個字串。', '輸出轉換後的字串。'),
(16, 16, '反轉字串', '輸出字串的反轉。', '輸入一個字串。', '輸出反轉後的字串。'),
(17, 17, '字串比較', '比較兩個字串是否相同。', '輸入兩個字串。', '輸出 yes 或 no。'),
(18, 18, '陣列最大值', '輸入 n 個整數，輸出其中最大值。', '輸入第一行 n，第二行 n 個整數。', '輸出最大值。'),
(19, 19, '陣列最小值', '輸入 n 個整數，輸出其中最小值。', '輸入第一行 n，第二行 n 個整數。', '輸出最小值。'),
(20, 20, '陣列總和', '輸入 n 個整數，計算總和。', '輸入第一行 n，第二行 n 個整數。', '輸出總和。'),
(21, 21, '陣列平均值', '輸入 n 個整數，輸出平均值（取整數）。', '輸入第一行 n，第二行 n 個整數。', '輸出平均值。'),
(22, 22, '排序', '輸入 n 個整數，輸出遞增排序後的結果。', '輸入第一行 n，第二行 n 個整數。', '輸出排序後的數列。'),
(23, 23, '矩陣加法', '輸入兩個矩陣，輸出它們的和。', '輸入矩陣大小 m, n，接著輸入兩個矩陣。', '輸出矩陣加法結果。'),
(24, 24, '矩陣轉置', '將矩陣轉置後輸出。', '輸入 m, n，接著輸入矩陣。', '輸出轉置矩陣。'),
(25, 25, '函式呼叫', '寫一個函式計算平方並在主程式呼叫。', '輸入一個整數。', '輸出該整數平方。'),
(26, 26, '最大公因數', '輸入兩個數，輸出最大公因數。', '輸入兩個整數 a, b。', '輸出 GCD。'),
(27, 27, '最小公倍數', '輸入兩個數，輸出最小公倍數。', '輸入兩個整數 a, b。', '輸出 LCM。'),
(28, 28, '指標練習1', '使用指標讀取並輸出一個整數。', '輸入一個整數。', '輸出該整數。'),
(29, 29, '指標練習2', '使用指標交換兩個整數的值。', '輸入兩個整數。', '輸出交換後的兩數。'),
(30, 30, '遞迴階乘', '用遞迴方式計算階乘。', '輸入一個整數 n。', '輸出 n!。'),
(31, 31, '遞迴費氏', '用遞迴方式計算第 n 項費氏數。', '輸入一個整數 n。', '輸出第 n 項費氏數。'),
(32, 32, 'while 迴圈練習', '用 while 迴圈計算 1 到 n 的總和。', '輸入 n。', '輸出總和。'),
(33, 33, 'do while 練習', '用 do while 迴圈輸出 1 到 n。', '輸入 n。', '輸出數列。'),
(34, 34, 'for 迴圈練習', '用 for 迴圈輸出 n!。', '輸入 n。', '輸出 n!。'),
(35, 35, '溫度轉換', '輸入攝氏溫度，輸出華氏溫度。', '輸入攝氏溫度。', '輸出華氏溫度。'),
(36, 36, 'BMI 計算', '輸入身高體重，計算 BMI。', '輸入身高（公尺）與體重（公斤）。', '輸出 BMI 值。'),
(37, 37, '簡單計算機', '實作加減乘除四則運算。', '輸入兩個數與一個運算符號。', '輸出計算結果。'),
(38, 38, '字串長度函式', '自己寫一個 strlen 函式。', '輸入一個字串。', '輸出長度。'),
(39, 39, '字串複製函式', '自己寫一個 strcpy 函式。', '輸入一個字串。', '輸出複製結果。'),
(40, 40, '字串連接函式', '自己寫一個 strcat 函式。', '輸入兩個字串。', '輸出連接結果。'),
(41, 41, '字串搜尋函式', '自己寫一個 strchr 函式。', '輸入字串與字元。', '輸出字元位置或 -1。'),
(42, 42, '結構體練習1', '定義結構存放學生姓名與分數，並輸出。', '輸入姓名與分數。', '輸出姓名與分數。'),
(43, 43, '結構體練習2', '輸入多個學生資料，找出最高分。', '輸入 n 與 n 筆資料。', '輸出最高分學生。'),
(44, 44, '指標與陣列', '使用指標存取陣列元素。', '輸入陣列。', '輸出所有元素。'),
(45, 45, '動態記憶體配置', '使用 malloc 配置 n 個整數並輸出。', '輸入 n 與 n 個整數。', '輸出整數。'),
(46, 46, '檔案讀寫', '將輸入寫入檔案，再讀出輸出。', '輸入一個字串。', '輸出字串。'),
(47, 47, '進位轉換', '將十進位數轉為二進位。', '輸入一個整數。', '輸出其二進位表示。'),
(48, 48, '最大子陣列和', '計算陣列的最大連續子陣列和。', '輸入 n 與陣列。', '輸出最大和。'),
(49, 49, '泡沫排序', '用 bubble sort 排序陣列。', '輸入 n 與陣列。', '輸出排序結果。'),
(50, 50, '選擇排序', '用 selection sort 排序陣列。', '輸入 n 與陣列。', '輸出排序結果。'),
(51, 51, '插入排序', '用 insertion sort 排序陣列。', '輸入 n 與陣列。', '輸出排序結果。'),
(52, 52, '快速排序', '用 quick sort 排序陣列。', '輸入 n 與陣列。', '輸出排序結果。');

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
-- 資料表索引 `chat`
--
ALTER TABLE `chat`
  ADD PRIMARY KEY (`c_id`);

--
-- 資料表索引 `code`
--
ALTER TABLE `code`
  ADD PRIMARY KEY (`code_id`);

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
-- 使用資料表自動遞增(AUTO_INCREMENT) `chat`
--
ALTER TABLE `chat`
  MODIFY `c_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `code`
--
ALTER TABLE `code`
  MODIFY `code_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

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
