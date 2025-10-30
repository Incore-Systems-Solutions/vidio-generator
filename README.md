START: User bayar dengan koin
↓
[MODAL 1: Pembuatan Naskah]
├─ Polling check-prompt setiap 5 detik
├─ Tampil progress per scene
└─ STOP ketika prompt_video !== null ✅
↓
setIsOptimizingPrompt(false)
setIsBatchProcessing(true)
↓
[MODAL 2: Batch Processing]
├─ Tampil list batch
├─ Polling status-batch setiap 5 detik
├─ Tampil progress setiap batch
└─ Check semua status
↓
┌────┴────┐
│ Failed? │─ YES → Tampil button "Regenerate Batch" ✅
└────┬────┘
NO (All Success)
↓
Tampil Success Message
↓
Tampil Button "Generate Video" ✅
↓
User klik button
↓
Call API: /api/generate-video/${uuid}
        ↓
  Redirect ke: /generate/${uuid}
↓
END: GenerateVideoPage (Video Merge Status)
