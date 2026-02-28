from fastapi import FastAPI

app = FastAPI(title="Hub de Recursos Educacionais")

@app.get("/health")
def health_check():
    return {"status": "online", "message": "Backend operando corretamente"}