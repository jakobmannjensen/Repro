use Repro;
--use mannen_dk_db;

create table AE_File
(
	AE_Job_FileID int not null primary key identity,
	AE_ShortID int not null,
	AE_Job_INorOUT varchar(255) not null,
	AE_Job_Path varchar(255) not null,
	CONSTRAINT UC_AE_File2 UNIQUE (AE_ShortID, AE_Job_INorOUT, AE_Job_Path)
);
