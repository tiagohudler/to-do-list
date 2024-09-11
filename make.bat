@echo off


IF /I "%1"=="build" GOTO build
IF /I "%1"=="up" GOTO up
GOTO error

:build
	docker-compose up --build
	GOTO :EOF

:up
    docker-compose up
	GOTO :EOF

:error
    IF "%1"=="" (
        ECHO make: *** No targets specified and no makefile found.  Stop.
    ) ELSE (
        ECHO make: *** No rule to make target '%1%'. Stop.
    )
    GOTO :EOF
