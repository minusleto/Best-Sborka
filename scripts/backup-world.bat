@echo off
REM Back up Minecraft worlds. Usage: backup-world.bat ["World name"]
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0backup-world.ps1" -World "%~1"
echo.
pause
