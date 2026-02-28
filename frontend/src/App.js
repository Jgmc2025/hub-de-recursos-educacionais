import { useState } from 'react';
import axios from 'axios';
import { Sparkles, Loader2, Save, Tag, X, Plus } from 'lucide-react';

function App() {
  const [editingIndex, setEditingIndex] = useState(null)
  const [isAdding, setIsAdding] = useState(false); 
  const [newTagValue, setNewTagValue] = useState('');
  const [editValue, setEditValue] = useState('')
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    resource_type: 'Vídeo',
    tags: '',
    url: ''
  });
  const tagsArray = formData.tags ? formData.tags.split(',').map(t => t.trim()).filter(t => t !== '') : [];
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
      alert("O Serviço de Assistência por IA está indisponível no momento. Por favor, tente mais tarde.");
    } finally {
      setLoading(false);
    }
  };
  const validateForm = () => {
    const titleClean = formData.title.trim();
    const urlClean = formData.url.trim();
    if (titleClean.length < 3) {
      alert("Por favor, insira um título mais descritivo.");
      return false;
    }
    try {
      if (!urlClean) throw new Error();
      new URL(urlClean);
    } catch (error) {
      alert("Por favor, insira um endereço de URL válido.");
      return false;
    }
    return true;
  };
  const handleSave = async () => {
    if (!validateForm()) return;
    setLoading(true);
    try {
      await axios.post('http://127.0.0.1:8000/resources', {
        ...formData,
        tags: tagsArray
      });
      alert("Recurso salvo com sucesso no hub_educacional.db!");
      setFormData({ title: '', description: '', resource_type: 'Vídeo', tags: '', url: '' });
    } catch (error) {
      alert("Erro ao conectar com o servidor.");
    } finally {
      setLoading(false);
    }
  };
  const updateTagsString = (newArray) => {
    setFormData({ ...formData, tags: newArray.join(', ') });
  };
  const removeTag = (indexToRemove) => {
    updateTagsString(tagsArray.filter((_, index) => index !== indexToRemove));
  };
  const saveTagEdit = (index) => {
    const cleanEdit = editValue.trim().toLowerCase();
    if (!cleanEdit) {
      setEditingIndex(null);
      return;
    }
    const isDuplicate = tagsArray.some((tag, i) => i !== index && tag.toLowerCase() === cleanEdit);
    if (isDuplicate) {
      alert(`A tag "${cleanEdit}" já existe nesta lista.`);
      setEditingIndex(null); 
      return;
    }
    const newTags = [...tagsArray];
    newTags[index] = editValue.trim(); 
    updateTagsString(newTags);
    setEditingIndex(null);
  };
  const addNewTag = () => {
    const cleanTag = newTagValue.trim();
    if (cleanTag) {
      const tagExists = tagsArray.some(t => t.toLowerCase() === cleanTag.toLowerCase());
      if (tagExists) {
        alert("Esta tag já existe.");
      } else {
        updateTagsString([...tagsArray, cleanTag]);
      }
    }
    setNewTagValue('');
    setIsAdding(false);
  };
  const titleError = formData.title.length > 0 && formData.title.trim().length < 3;
  const descError = formData.description.length > 0 && formData.description.trim().length < 20;
  const isUrlValid = (url) => {
    try { new URL(url); return true; } catch { return false; }
  };
  const urlError = formData.url.length > 0 && !isUrlValid(formData.url);
  const isFormValid = () => {
    const isTitleValid = formData.title.trim().length >= 3;
    const isDescriptionValid = formData.description.trim().length >= 20;
    const isTagsValid = tagsArray.length > 0;
    let isUrlValid = false;
    try {
      new URL(formData.url);
      isUrlValid = true;
    } catch (e) {
      isUrlValid = false;
    }
    return isTitleValid && isDescriptionValid && isTagsValid && isUrlValid;
  };
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Cadastrar Recurso</h1>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Título</label>
            <input 
              type="text"
              className={`block w-full border rounded-md p-2 outline-none transition-all ${titleError ? 'border-red-500 focus:ring-2 focus:ring-red-200' : 'border-gray-300 focus:ring-2 focus:ring-indigo-500'}`}
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              placeholder='Insira o título...'
            />
            {titleError && <p className="text-red-500 text-xs mt-1">Mínimo de 3 dígitos.</p>}
          </div>
          <div className="flex gap-4 items-end">
            <div className="flex-1">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Tipo</label>
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
              disabled={loading || titleError || formData.title.length === 0} 
              className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all h-11 font-medium
                ${loading || titleError || formData.title.length === 0
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed border border-gray-300' 
                  : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm active:scale-95'
                }`}
            >
              {loading ? <Loader2 className="animate-spin" size={18} /> : <Sparkles size={18} />}
              {loading ? 'Gerando...' : "Gerar Descrição com IA"}
            </button>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Descrição</label>
            <div className={`relative border rounded-md bg-white transition-all ${descError ? 'border-red-500 focus-within:ring-2 focus-within:ring-red-200' : 'border-gray-300 focus-within:ring-2 focus-within:ring-indigo-500'}`}>
              <textarea 
                rows="4"
                className="block w-full border-none bg-transparent py-2 px-3 pr-10 resize-none outline-none overflow-y-auto leading-relaxed text-black"
                style={{ WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)' }}
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                placeholder='Descreva o conteúdo completo...'
              />
            </div>
            {descError && <p className="text-red-500 text-xs mt-1">Mínimo de 20 dígitos.</p>}
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Tags</label>
            <div className="flex flex-wrap gap-2 p-3 bg-gray-50 border border-gray-300 rounded-md min-h-[60px] items-center">
              {tagsArray.map((tag, index) => (
                <div key={index} className="flex items-center">
                  {editingIndex === index ? (
                    <input 
                      autoFocus
                      className="group flex items-center gap-1 bg-white text-indigo-600 text-xs font-bold px-3 py-1.5 rounded-md border border-indigo-100 shadow-sm hover:border-indigo-400 transition-all"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      onBlur={() => saveTagEdit(index)}
                      onKeyDown={(e) => e.key === 'Enter' && saveTagEdit(index)}
                    />
                  ) : (
                    <span className="group flex items-center gap-1 bg-white text-indigo-600 text-xs font-bold px-3 py-1.5 rounded-md border border-indigo-100 shadow-sm hover:border-indigo-400 transition-all">
                      <span onClick={() => { setEditingIndex(index); setEditValue(tag); }} className="cursor-pointer flex items-center gap-1">
                        <Tag size={10} />
                        {tag}
                      </span>
                      <X 
                        size={14} 
                        className="ml-1 text-gray-300 hover:text-red-500 cursor-pointer" 
                        onClick={() => removeTag(index)}
                      />
                    </span>
                  )}
                </div>
              ))}
              {isAdding ? (
                <input 
                  autoFocus
                  placeholder="Nome da tag..."
                  className="group flex items-center gap-1 bg-white text-indigo-600 text-xs font-bold px-3 py-1.5 rounded-md border border-indigo-100 shadow-sm hover:border-indigo-400 transition-all"
                  onChange={(e) => setNewTagValue(e.target.value)}
                  onBlur={addNewTag}
                  onKeyDown={(e) => e.key === 'Enter' && addNewTag()}
                />
              ) : (
                <button 
                  onClick={() => setIsAdding(true)}
                  className="flex items-center gap-1 bg-white text-gray-400 text-xs font-bold px-3 py-1.5 rounded-md border border-dashed border-gray-300 hover:border-indigo-400 hover:text-indigo-500 transition-all shadow-sm"
                >
                  <Plus size={14} />
                  Nova Tag
                </button>
              )}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 font-semibold">URL</label>
            <input 
              type="url"
              className={`block w-full border rounded-md p-2 outline-none transition-all ${urlError ? 'border-red-500 focus:ring-2 focus:ring-red-200' : 'border-gray-300 focus:ring-2 focus:ring-indigo-500'}`}
              value={formData.url}
              onChange={(e) => setFormData({...formData, url: e.target.value})}
              placeholder='https://youtube.com/...'
            />
            {urlError && <p className="text-red-500 text-xs mt-1">Insira uma URL válida.</p>}
          </div>
          <button 
            onClick={handleSave}
            disabled={loading || !isFormValid()}
            className={`w-full flex items-center justify-center gap-2 font-bold py-3 rounded-md mt-6 transition-all active:scale-95 
              ${loading || !isFormValid() 
                ? 'bg-gray-300 cursor-not-allowed text-gray-500' 
                : 'bg-green-600 hover:bg-green-700 text-white shadow-lg'
              }`}
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}
export default App;