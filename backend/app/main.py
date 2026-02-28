import time
import logging
from fastapi import FastAPI, HTTPException
from app.schemas import SmartAssistRequest, SmartAssistResponse
from app.services.ai_service import generate_educational_metadata

app = FastAPI()
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@app.post("/smart-assist", response_model=SmartAssistResponse)
async def smart_assist(data: SmartAssistRequest):
    start_time = time.time()
    try:
        result = generate_educational_metadata(data.title, data.resource_type)
        latency = time.time() - start_time
        logger.info(f"[INFO] AI Request: Title='{data.title}', Latency={latency:.2f}s")
        return result
    except Exception as e:
        logger.error(f"[ERROR] Falha na IA: {str(e)}")
        raise HTTPException(status_code=500, detail="Erro ao processar sugestão da IA.")