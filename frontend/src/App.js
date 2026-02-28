import { useState } from 'react';
import axios from 'axios';
import { Sparkles, Loader2, Save } from 'lucide-react';

function App() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    resource_type: 'Vídeo',
    tags: ''
  });
  const handleSmartAssist = async () => {
    if (!formData.title) {
      alert("Digite um título primeiro!");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post('http://127.0.0.1:8000/smart-assist', {
        title: formData.title,
        resource_type: formData.resource_type
      });
      setFormData({
        ...formData,
        description: response.data.description,
        tags: response.data.tags.join(', ')
      });
    } catch (error) {
      console.error("Erro na IA:", error);
      alert("A IA falhou, mas você pode preencher manualmente.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Cadastrar Recurso</h1>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Título</label>
            <input 
              type="text"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
            />
          </div>
          <div className="flex gap-4 items-end">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">Tipo</label>
              <select 
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                value={formData.resource_type}
                onChange={(e) => setFormData({...formData, resource_type: e.target.value})}
              >
                <option>Vídeo</option>
                <option>PDF</option>
                <option>Link</option>
              </select>
            </div>
            <button 
              onClick={handleSmartAssist}
              disabled={loading}
              className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 disabled:bg-gray-400 transition-colors"
            >
              {loading ? <Loader2 className="animate-spin" size={18} /> : <Sparkles size={18} />}
              Smart Assist
            </button>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Descrição</label>
            <textarea 
              rows="4"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Tags (separadas por vírgula)</label>
            <input 
              type="text"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              value={formData.tags}
              onChange={(e) => setFormData({...formData, tags: e.target.value})}
            />
          </div>
          <button className="w-full flex items-center justify-center gap-2 bg-green-600 text-white font-bold py-3 rounded-md hover:bg-green-700 mt-6">
            <Save size={20} /> Salvar Recurso
          </button>
        </div>
      </div>
    </div>
  );
}
export default App;