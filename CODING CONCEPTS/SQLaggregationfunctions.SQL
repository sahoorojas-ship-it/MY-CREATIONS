-- --Course Table
-- CREATE TABLE Course (
--     Course_ID INT PRIMARY KEY,
--     Course_Name VARCHAR(100)
-- );

-- Student Table
--CREATE TABLE Student (
    --Student_ID INT PRIMARY KEY,
    --Name VARCHAR(100) NOT NULL,
    --Age INT NOT NULL,
    --Course_ID INT,
    --FOREIGN KEY (Course_ID) REFERENCES Course(Course_ID)
    --ON DELETE CASCADE
    --ON UPDATE CASCADE
--);

-- Employees Table
--CREATE TABLE Employees (
   -- ID VARCHAR(10),
   -- Serial_Number INT,
   -- Name VARCHAR(100),
   -- Department VARCHAR(100),
   -- Age INT,
   -- Email VARCHAR(100),
   -- Date_Of_Birth DATE
--);

-- Course Inserts
--INSERT INTO Course(Course_ID, Course_Name) VALUES (158, 'DSA');

-- Update Course
--UPDATE Course SET Course_ID = 184 WHERE Course_ID = 156;

-- Student Inserts
--INSERT INTO Student(Student_ID, Name, Age, Course_ID) VALUES (104, 'Manoj', 15, 158);

-- Employees Inserts
/*INSERT INTO Employees (ID, Serial_Number, Name, Department, Age, Email, Date_Of_Birth) VALUES ('S001', 1, 'Amit Sharma', 'HR', 28, 'amit.sharma@gmail.com', '1997-03-15');
INSERT INTO Employees (ID, Serial_Number, Name, Department, Age, Email, Date_Of_Birth) VALUES ('S002', 2, 'Priya Mehta', 'Finance', 30, 'priya.mehta@gmail.com', '1995-07-21');
INSERT INTO Employees (ID, Serial_Number, Name, Department, Age, Email, Date_Of_Birth) VALUES ('S003', 3, 'Rahul Verma', 'IT', 25, 'rahul.verma@gmail.com', '2000-01-10');
INSERT INTO Employees (ID, Serial_Number, Name, Department, Age, Email, Date_Of_Birth) VALUES ('S004', 4, 'Sneha Iyer', 'Marketing', 27, 'sneha.iyer@gmail.com', '1998-11-05');
INSERT INTO Employees (ID, Serial_Number, Name, Department, Age, Email, Date_Of_Birth) VALUES ('S005', 5, 'Arjun Kapoor', 'Sales', 29, 'arjun.kapoor@gmail.com', '1996-06-18');
INSERT INTO Employees (ID, Serial_Number, Name, Department, Age, Email, Date_Of_Birth) VALUES ('S006', 6, 'Neha Singh', 'Admin', 32, 'neha.singh@gmail.com', '1993-09-25');
INSERT INTO Employees (ID, Serial_Number, Name, Department, Age, Email, Date_Of_Birth) VALUES ('S007', 7, 'Vikram Patel', 'Operations', 35, 'vikram.patel@gmail.com', '1990-02-12');
INSERT INTO Employees (ID, Serial_Number, Name, Department, Age, Email, Date_Of_Birth) VALUES ('S008', 8, 'Kavita Joshi', 'Legal', 31, 'kavita.joshi@gmail.com', '1994-04-08');
INSERT INTO Employees (ID, Serial_Number, Name, Department, Age, Email, Date_Of_Birth) VALUES ('S009', 9, 'Rohan Das', 'Support', 26, 'rohan.das@gmail.com', '1999-12-01');
INSERT INTO Employees (ID, Serial_Number, Name, Department, Age, Email, Date_Of_Birth) VALUES ('S010', 10, 'Anjali Nair', 'Design', 24, 'anjali.nair@gmail.com', '2001-05-30');
INSERT INTO Employees (ID, Serial_Number, Name, Department, Age, Email, Date_Of_Birth) VALUES ('S011', 11, 'Suresh Reddy', 'Logistics', 33, 'suresh.reddy@gmail.com', '1992-08-14');
INSERT INTO Employees (ID, Serial_Number, Name, Department, Age, Email, Date_Of_Birth) VALUES ('S012', 12, 'Pooja Gupta', 'Quality', 28, 'pooja.gupta@gmail.com', '1997-10-22');
INSERT INTO Employees (ID, Serial_Number, Name, Department, Age, Email, Date_Of_Birth) VALUES ('S013', 13, 'Manish Yadav', 'Production', 36, 'manish.yadav@gmail.com', '1989-03-03');
INSERT INTO Employees (ID, Serial_Number, Name, Department, Age, Email, Date_Of_Birth) VALUES ('S014', 14, 'Deepika Sen', 'Research', 29, 'deepika.sen@gmail.com', '1996-07-19');
INSERT INTO Employees (ID, Serial_Number, Name, Department, Age, Email, Date_Of_Birth) VALUES ('S015', 15, 'Karan Malhotra', 'Security', 34, 'karan.malhotra@gmail.com', '1991-11-11');
INSERT INTO Employees (ID, Serial_Number, Name, Department, Age, Email, Date_Of_Birth) VALUES ('S016', 16, 'Meera Pillai', 'Training', 27, 'meera.pillai@gmail.com', '1998-02-27');
INSERT INTO Employees (ID, Serial_Number, Name, Department, Age, Email, Date_Of_Birth) VALUES ('S017', 17, 'Ajay Choudhary', 'Maintenance', 38, 'ajay.choudhary@gmail.com', '1987-06-06');
INSERT INTO Employees (ID, Serial_Number, Name, Department, Age, Email, Date_Of_Birth) VALUES ('S018', 18, 'Nisha Arora', 'Procurement', 26, 'nisha.arora@gmail.com', '1999-09-09');
INSERT INTO Employees (ID, Serial_Number, Name, Department, Age, Email, Date_Of_Birth) VALUES ('S019', 19, 'Rakesh Jain', 'Audit', 40, 'rakesh.jain@gmail.com', '1985-12-20');
INSERT INTO Employees (ID, Serial_Number, Name, Department, Age, Email, Date_Of_Birth) VALUES ('S020', 20, 'Simran Kaur', 'Public Relations', 23, 'simran.kaur@gmail.com', '2002-04-17');*/

--select Student.Student_ID, Student.Name, Course_Name from Student inner join Course on Student.Course_ID=Course.Course_ID

--SELECT Customers.Customer_ID,
       --Customers.First_Name,
       --Customers.Last_Name,
       --Orders.Item
--FROM Customers
--LEFT JOIN Orders
--ON Customers.Customer_ID = Orders.Customer_ID;