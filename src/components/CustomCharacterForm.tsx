import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  User, 
  Eye, 
  Lightbulb, 
  FileText, 
  ArrowLeft,
  CheckCircle,
  XCircle,
  ThumbsUp,
  ThumbsDown
} from "lucide-react"

export function CustomCharacterForm() {
  const [characterName, setCharacterName] = useState("")
  const [characterStyle, setCharacterStyle] = useState("")
  const [characterDescription, setCharacterDescription] = useState("")
  const [selectedExample, setSelectedExample] = useState<string | null>(null)
  const [previewGenerated, setPreviewGenerated] = useState(false)
  const [previewConfirmed, setPreviewConfirmed] = useState<boolean | null>(null)

  const styleOptions = [
    { value: "realistic", label: "Realistis" },
    { value: "cartoon", label: "Kartun" },
    { value: "anime", label: "Anime" },
    { value: "3d", label: "3D" }
  ]

  const exampleDescriptions = [
    {
      id: "teacher",
      title: "Guru Muda",
      description: "Seorang pengajar muda berusia 25 tahun dengan rambut coklat pendek, memakai kemeja putih dan celana hitam, memiliki ekspresi ramah dan ceria",
      style: "Cartoon"
    },
    {
      id: "doctor",
      title: "Dokter Perempuan",
      description: "Dokter perempuan berusia 35 tahun dengan jas putih, rambut hitam diikat rapi, memakai kacamata, terlihat profesional dan berwibawa",
      style: "Realistis"
    },
    {
      id: "chef",
      title: "Chef Pria",
      description: "Chef pria berusia 40 tahun dengan topi chef putih, baju chef putih, kumis tipis, memiliki senyum hangat dan gesture memasak",
      style: "Realistis"
    },
    {
      id: "entrepreneur",
      title: "Pengusaha Wanita",
      description: "Pengusaha wanita berusia 30 tahun dengan blazer navy, rambut panjang bergelombang, memakai jam tangan elegan, terlihat percaya diri",
      style: "Realistis"
    }
  ]

  const handleExampleClick = (example: typeof exampleDescriptions[0]) => {
    setCharacterName(example.title)
    setCharacterDescription(example.description)
    setCharacterStyle(example.style.toLowerCase())
    setSelectedExample(example.id)
  }

  const handleGeneratePreview = () => {
    if (characterName && characterDescription && characterStyle) {
      setPreviewGenerated(true)
    }
  }

  const handleConfirmPreview = (confirmed: boolean) => {
    setPreviewConfirmed(confirmed)
  }

  return (
    <div className="w-full">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <User className="w-8 h-8 text-purple-600 mr-3" />
          <h1 className="text-4xl font-bold">Buat Karakter Custom</h1>
        </div>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Deskripsikan karakter yang Anda inginkan dan AI akan membuatkannya untuk Anda
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Prompt Detail Karakter */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="w-5 h-5" />
                <span>Prompt Detail Karakter</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Nama Karakter</label>
                <Input
                  placeholder="Masukkan nama karakter anda..."
                  value={characterName}
                  onChange={(e) => setCharacterName(e.target.value)}
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Style</label>
                <Select value={characterStyle} onValueChange={setCharacterStyle}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Pilih style karakter anda" />
                  </SelectTrigger>
                  <SelectContent>
                    {styleOptions.map((style) => (
                      <SelectItem key={style.value} value={style.value}>
                        {style.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Deskripsikan Detail</label>
                <Textarea
                  placeholder="Masukkan detail dari karakter yang ingin anda buat..."
                  value={characterDescription}
                  onChange={(e) => setCharacterDescription(e.target.value)}
                  className="min-h-32"
                />
                <p className="text-sm text-muted-foreground mt-2">
                  Semakin detail deskripsi, semakin baik hasil yang akan dihasilkan AI
                </p>
              </div>

              <div className="flex space-x-4">
                <Button variant="outline" size="lg" className="flex items-center space-x-2">
                  <ArrowLeft className="w-4 h-4" />
                  <span>← Kembali Ke Template</span>
                </Button>
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 flex items-center space-x-2"
                  onClick={handleGeneratePreview}
                  disabled={!characterName || !characterDescription || !characterStyle}
                >
                  <Eye className="w-4 h-4" />
                  <span>Lihat Preview Karakter</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Preview Karakter */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Eye className="w-5 h-5" />
                <span>Preview Karakter</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Main Preview Area */}
              <div className="bg-gray-900 rounded-lg h-64 flex items-center justify-center">
                <div className="text-center text-gray-400">
                  <User className="w-16 h-16 mx-auto mb-2" />
                  <p>Preview karakter akan muncul di sini</p>
                </div>
              </div>

              {/* Example Character Thumbnails */}
              <div className="grid grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div 
                    key={i}
                    className={`aspect-square rounded-lg bg-gray-200 flex items-center justify-center cursor-pointer transition-all ${
                      i === 1 ? 'ring-2 ring-purple-500' : 'hover:ring-2 hover:ring-gray-300'
                    }`}
                  >
                    <User className="w-8 h-8 text-gray-400" />
                  </div>
                ))}
              </div>

              {/* Deskripsi yang Digunakan */}
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                  {characterDescription || "Belum ada deskripsi karakter"}
                </p>
                <Badge variant="secondary" className="text-xs">
                  Style: {characterStyle || "Belum dipilih"}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Konfirmasi Preview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5" />
                <span>Konfirmasi Preview</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Apakah preview karakter di atas sudah sesuai dengan deskripsi yang Anda berikan?
              </p>
              
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {characterDescription || "Belum ada deskripsi karakter"}
                </p>
              </div>

              <div className="flex space-x-4">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="flex items-center space-x-2 text-green-600 border-green-600 hover:bg-green-50"
                  onClick={() => handleConfirmPreview(true)}
                  disabled={!characterDescription}
                >
                  <ThumbsUp className="w-4 h-4" />
                  <span>Ya, Sudah Sesuai</span>
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="flex items-center space-x-2 text-red-600 border-red-600 hover:bg-red-50"
                  onClick={() => handleConfirmPreview(false)}
                  disabled={!characterDescription}
                >
                  <ThumbsDown className="w-4 h-4" />
                  <span>Belum Sesuai</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Contoh Deskripsi */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Lightbulb className="w-5 h-5" />
                <span>Contoh Deskripsi</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Klik contoh di bawah untuk menggunakan sebagai template:
              </p>
              <div className="space-y-3">
                {exampleDescriptions.map((example) => (
                  <div 
                    key={example.id}
                    className={`p-3 border rounded-lg cursor-pointer transition-all ${
                      selectedExample === example.id 
                        ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => handleExampleClick(example)}
                  >
                    <p className="text-sm font-medium mb-2">{example.title}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                      {example.description}
                    </p>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="w-full text-xs"
                    >
                      Klik untuk gunakan
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Tips untuk Preview Terbaik */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Lightbulb className="w-5 h-5" />
                <span>Tips untuk Preview Terbaik</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Sertakan detail fisik yang spesifik</li>
                <li>• Jelaskan gaya berpakaian dengan detail</li>
                <li>• Tambahkan karakteristik unik</li>
                <li>• Sebutkan ekspresi wajah dan pose</li>
                <li>• Tentukan usia dan gender dengan jelas</li>
              </ul>
              
              <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <div className="flex items-start space-x-2">
                  <Lightbulb className="w-4 h-4 text-yellow-600 mt-0.5" />
                  <p className="text-xs text-yellow-800 dark:text-yellow-200">
                    Preview akan menampilkan variasi visual berdasarkan deskripsi Anda. Pilih yang paling sesuai, konfirmasi kesesuaian, baru bisa membuat karakter.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tips Tambahan */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Lightbulb className="w-5 h-5" />
                <span>Tips untuk Preview Terbaik</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Tambahkan detail warna rambut, mata, dan kulit</li>
                <li>• Sebutkan postur tubuh (tinggi, pendek, ramping, dll)</li>
                <li>• Jelaskan ekspresi wajah yang diinginkan</li>
                <li>• Tambahkan aksesori khusus (kacamata, jam, dll)</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
