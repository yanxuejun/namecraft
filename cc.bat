@echo off
setlocal enabledelayedexpansion
title Claude Code Launcher
cls

echo ========================================
echo    Claude Code Environment Launcher
echo ========================================
echo.

:: Get user home directory
set "USER_HOME=%USERPROFILE%"

:: Create .claude.json if not exists
set "CONFIG_FILE=%USER_HOME%\.claude.json"
if not exist "%CONFIG_FILE%" (
    echo Creating %CONFIG_FILE%...
    echo {> "%CONFIG_FILE%"
    echo   "hasCompletedOnboarding": true>> "%CONFIG_FILE%"
    echo }>> "%CONFIG_FILE%"
    echo Done.
    echo.
)

:: Define API keys for each provider (default 123)
set "ZHIPU_API_KEY=2f9176b4eb72470388e4545f1469f4c5.E2kdlrWTrnlK6lZ8"
set "MINIMAX_API_KEY=123"
set "KIMI_API_KEY=sk-kimi-fIHSNhptYjmyTLDxzlRVTLWgaMZHGNM7hqiq4roKkhUsGayo7HbsGHpTdQ22uxRz"
set "ALIBABA_API_KEY=123"
set "DEEPSEEK_API_KEY=sk-c72ef3c2715340e3a395ccf0c77e9434"
set "OPENROUTER_API_KEY=123"

:: Define provider configurations
set "PROV_1_NAME=Zhipu AI - GLM-4.7"
set "PROV_1_BASE_URL=https://open.bigmodel.cn/api/anthropic"
set "PROV_1_MODEL=glm-4.7"
set "PROV_1_API_KEY=%ZHIPU_API_KEY%"

set "PROV_2_NAME=Zhipu AI - GLM-4.6"
set "PROV_2_BASE_URL=https://open.bigmodel.cn/api/anthropic"
set "PROV_2_MODEL=glm-4.6"
set "PROV_2_API_KEY=%ZHIPU_API_KEY%"

set "PROV_3_NAME=Zhipu AI - GLM-4-Plus"
set "PROV_3_BASE_URL=https://open.bigmodel.cn/api/anthropic"
set "PROV_3_MODEL=glm-4-plus"
set "PROV_3_API_KEY=%ZHIPU_API_KEY%"

set "PROV_4_NAME=Zhipu AI - GLM-4-Air"
set "PROV_4_BASE_URL=https://open.bigmodel.cn/api/anthropic"
set "PROV_4_MODEL=glm-4-air"
set "PROV_4_API_KEY=%ZHIPU_API_KEY%"

set "PROV_5_NAME=Zhipu AI - GLM-4-Flash"
set "PROV_5_BASE_URL=https://open.bigmodel.cn/api/anthropic"
set "PROV_5_MODEL=glm-4-flash"
set "PROV_5_API_KEY=%ZHIPU_API_KEY%"

set "PROV_6_NAME=MiniMax (M2.7)"
set "PROV_6_BASE_URL=https://api.minimax.io/anthropic"
set "PROV_6_MODEL=MiniMax-M2.7"
set "PROV_6_API_KEY=%MINIMAX_API_KEY%"

set "PROV_7_NAME=Kimi (Moonshot)"
set "PROV_7_BASE_URL=https://api.kimi.com/coding/"
set "PROV_7_MODEL=K2.6-code-preview"
set "PROV_7_API_KEY=%KIMI_API_KEY%"

set "PROV_8_NAME=Alibaba Cloud (Qwen)"
set "PROV_8_BASE_URL=https://coding-intl.dashscope.aliyuncs.com/apps/anthropic"
set "PROV_8_MODEL=qwen3.5-plus"
set "PROV_8_API_KEY=%ALIBABA_API_KEY%"

set "PROV_9_NAME=DeepSeek"
set "PROV_9_BASE_URL=https://api.deepseek.com/anthropic"
set "PROV_9_MODEL=deepseek-v4-flash"
set "PROV_9_API_KEY=%DEEPSEEK_API_KEY%"

set "PROV_10_NAME=OpenRouter"
set "PROV_10_BASE_URL=https://openrouter.ai/api"
set "PROV_10_MODEL=anthropic/claude-sonnet-4"
set "PROV_10_API_KEY=%OPENROUTER_API_KEY%"

:: Display menu
echo Select your API provider:
echo.
echo   Zhipu AI Models:
echo   1. %PROV_1_NAME%
echo   2. %PROV_2_NAME%
echo   3. %PROV_3_NAME%
echo   4. %PROV_4_NAME%
echo   5. %PROV_5_NAME%
echo.
echo   Other Providers:
echo   6. %PROV_6_NAME%
echo   7. %PROV_7_NAME%
echo   8. %PROV_8_NAME%
echo   9. %PROV_9_NAME%
echo   10. %PROV_10_NAME%
echo.
set /p "choice=Enter number (1-10): "

:: Validate input
if "%choice%"=="" goto :invalid
if %choice% lss 1 goto :invalid
if %choice% gtr 10 goto :invalid

:: Set environment variables based on choice
if %choice%==1 (
    set "PROVIDER=%PROV_1_NAME%"
    set "ANTHROPIC_BASE_URL=%PROV_1_BASE_URL%"
    set "ANTHROPIC_MODEL=%PROV_1_MODEL%"
    set "ANTHROPIC_AUTH_TOKEN=%PROV_1_API_KEY%"
)
if %choice%==2 (
    set "PROVIDER=%PROV_2_NAME%"
    set "ANTHROPIC_BASE_URL=%PROV_2_BASE_URL%"
    set "ANTHROPIC_MODEL=%PROV_2_MODEL%"
    set "ANTHROPIC_AUTH_TOKEN=%PROV_2_API_KEY%"
)
if %choice%==3 (
    set "PROVIDER=%PROV_3_NAME%"
    set "ANTHROPIC_BASE_URL=%PROV_3_BASE_URL%"
    set "ANTHROPIC_MODEL=%PROV_3_MODEL%"
    set "ANTHROPIC_AUTH_TOKEN=%PROV_3_API_KEY%"
)
if %choice%==4 (
    set "PROVIDER=%PROV_4_NAME%"
    set "ANTHROPIC_BASE_URL=%PROV_4_BASE_URL%"
    set "ANTHROPIC_MODEL=%PROV_4_MODEL%"
    set "ANTHROPIC_AUTH_TOKEN=%PROV_4_API_KEY%"
)
if %choice%==5 (
    set "PROVIDER=%PROV_5_NAME%"
    set "ANTHROPIC_BASE_URL=%PROV_5_BASE_URL%"
    set "ANTHROPIC_MODEL=%PROV_5_MODEL%"
    set "ANTHROPIC_AUTH_TOKEN=%PROV_5_API_KEY%"
)
if %choice%==6 (
    set "PROVIDER=%PROV_6_NAME%"
    set "ANTHROPIC_BASE_URL=%PROV_6_BASE_URL%"
    set "ANTHROPIC_MODEL=%PROV_6_MODEL%"
    set "ANTHROPIC_AUTH_TOKEN=%PROV_6_API_KEY%"
)
if %choice%==7 (
    set "PROVIDER=%PROV_7_NAME%"
    set "ANTHROPIC_BASE_URL=%PROV_7_BASE_URL%"
    set "ANTHROPIC_MODEL=%PROV_7_MODEL%"
    set "ANTHROPIC_AUTH_TOKEN=%PROV_7_API_KEY%"
)
if %choice%==8 (
    set "PROVIDER=%PROV_8_NAME%"
    set "ANTHROPIC_BASE_URL=%PROV_8_BASE_URL%"
    set "ANTHROPIC_MODEL=%PROV_8_MODEL%"
    set "ANTHROPIC_AUTH_TOKEN=%PROV_8_API_KEY%"
)
if %choice%==9 (
    set "PROVIDER=%PROV_9_NAME%"
    set "ANTHROPIC_BASE_URL=%PROV_9_BASE_URL%"
    set "ANTHROPIC_MODEL=%PROV_9_MODEL%"
    set "ANTHROPIC_AUTH_TOKEN=%PROV_9_API_KEY%"
)
if %choice%==10 (
    set "PROVIDER=%PROV_10_NAME%"
    set "ANTHROPIC_BASE_URL=%PROV_10_BASE_URL%"
    set "ANTHROPIC_MODEL=%PROV_10_MODEL%"
    set "ANTHROPIC_AUTH_TOKEN=%PROV_10_API_KEY%"
)

:: Set proxy environment variables
set "HTTP_PROXY=http://127.0.0.1:7890"
set "HTTPS_PROXY=http://127.0.0.1:7890"

:: Disable experimental beta headers for better compatibility with third-party providers
set "CLAUDE_CODE_DISABLE_EXPERIMENTAL_BETAS=1"

:: Clear any conflicting environment variable
set "ANTHROPIC_API_KEY="

:: Display configuration
echo.
echo ========================================
echo Configuration:
echo ========================================
echo   Provider    : %PROVIDER%
echo   Base URL    : %ANTHROPIC_BASE_URL%
echo   Model       : %ANTHROPIC_MODEL%
echo   Auth Token  : %ANTHROPIC_AUTH_TOKEN%
echo   HTTP Proxy  : %HTTP_PROXY%
echo   HTTPS Proxy : %HTTPS_PROXY%
echo.
echo ========================================
echo NOTE: Default API keys are set to 123
echo To use your own API keys, edit this script
echo and change the following variables:
echo   ZHIPU_API_KEY, MINIMAX_API_KEY, KIMI_API_KEY
echo   ALIBABA_API_KEY, DEEPSEEK_API_KEY, OPENROUTER_API_KEY
echo ========================================
echo.
echo IMPORTANT: Claude Code uses ANTHROPIC_AUTH_TOKEN environment variable.
echo            Your token has been set automatically.
echo.
pause

:: Launch claude with environment variables
echo.
echo Launching Claude Code...
echo Press Ctrl+C to exit when done.
echo.

:: Run claude
claude

:: Pause on exit
echo.
echo Claude Code session ended.
pause
goto :eof

:invalid
echo Invalid selection. Please run the script again and enter a number between 1 and 10.
pause
exit /b 1