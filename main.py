import json

from fastapi import FastAPI, Request
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates

app = FastAPI()

app.mount("/static", StaticFiles(directory="static"), name="static")

templates = Jinja2Templates(directory="templates")


def get_content(lang: str):
    if lang not in ("en", "fr"):
        lang = "en"

    with open(f"content/{lang}.json") as json_file:
        content = json.load(json_file)
    return content



@app.exception_handler(404)
def page_not_found(request: Request, exc: Exception):
    content = get_content("en")
    return templates.TemplateResponse(
        request=request,
        name="404.html",
        context={"content": content, "active_page": "home"}
    )

@app.get("/")
def home(request: Request, lang: str = "en"):
    content = get_content(lang)
    return templates.TemplateResponse(
        request=request, name="index.html", context={"content": content, "active_page": "home"}
    )


@app.get("/api/me")
def easter_egg(lang: str = "en"):
    content = get_content(lang)

    return content["terminal"]


@app.get("/projects")
def project_page(request: Request, lang: str = "en"):
    content = get_content(lang)

    projects = content["projects"]

    return templates.TemplateResponse(
        request=request,
        name="projects.html",
        context={"content": content, "projects": projects, "active_page": "project_page"},
    )

@app.head("/health")
@app.get("/health")
async def health():
    return {"status": "ok"}
