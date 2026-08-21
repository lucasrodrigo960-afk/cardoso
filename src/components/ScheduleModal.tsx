import React, { useState } from 'react';
import { X, CheckCircle2 } from 'lucide-react';
import type { Tour } from '../types';

interface ScheduleModalProps {
  tour: Tour;
  onClose: () => void;
}

export const ScheduleModal: React.FC<ScheduleModalProps> = ({ tour, onClose }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [period, setPeriod] = useState('Manhã (09h - 12h)');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    const whatsappNumber = tour.consultantPhone || '5582999999999';
    const message = encodeURIComponent(
      `Olá, Douglas Cardoso!\n\nGostaria de agendar uma visita presencial para o imóvel "${tour.propertyName}".\n\n- Nome: ${name}\n- Telefone: ${phone}\n- Data desejada: ${date}\n- Período: ${period}`
    );

    setTimeout(() => {
      window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-2xl p-4">
      <div className="relative w-full max-w-md bg-[#121214] rounded-2xl p-8 border border-white/10 shadow-2xl text-white">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-1 text-zinc-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div>
            <div className="text-amber-400 text-xs tracking-[0.2em] font-light uppercase mb-2">
              Agendamento de Visita Privativa
            </div>

            <h2 className="text-2xl font-serif font-light text-white mb-2">
              Solicitar Horário
            </h2>
            <p className="text-xs text-zinc-400 font-light mb-8 leading-relaxed">
              Escolha a data e período de sua preferência para conhecer a <strong className="text-white font-normal">{tour.propertyName}</strong> acompanhado por Douglas Cardoso (CEO).
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-light text-zinc-400 uppercase tracking-widest mb-2">
                  Seu Nome Completo
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Roberto Silva"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#08080a] border border-white/10 rounded-xl py-3 px-4 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-light text-zinc-400 uppercase tracking-widest mb-2">
                  Telefone / WhatsApp
                </label>
                <input
                  type="tel"
                  required
                  placeholder="(82) 99999-9999"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-[#08080a] border border-white/10 rounded-xl py-3 px-4 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-light text-zinc-400 uppercase tracking-widest mb-2">
                    Data Pretendida
                  </label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-[#08080a] border border-white/10 rounded-xl py-3 px-4 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-light text-zinc-400 uppercase tracking-widest mb-2">
                    Período
                  </label>
                  <select
                    value={period}
                    onChange={(e) => setPeriod(e.target.value)}
                    className="w-full bg-[#08080a] border border-white/10 rounded-xl py-3 px-4 text-xs text-white focus:outline-none focus:border-amber-400 appearance-none"
                  >
                    <option value="Manhã (09h - 12h)">Manhã (09h - 12h)</option>
                    <option value="Tarde (14h - 17h)">Tarde (14h - 17h)</option>
                    <option value="Fim de Tarde (Pôr do Sol)">Pôr do Sol</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-full bg-white hover:bg-amber-400 text-black font-light text-xs uppercase tracking-[0.2em] transition-colors cursor-pointer mt-4"
              >
                CONFIRMAR E SOLICITAR VISITA
              </button>
            </form>
          </div>
        ) : (
          <div className="text-center py-8">
            <CheckCircle2 className="w-12 h-12 text-amber-400 mx-auto mb-4" />
            <h3 className="text-xl font-serif text-white mb-2">Solicitação Encaminhada</h3>
            <p className="text-xs text-zinc-400 max-w-xs mx-auto mb-6 leading-relaxed">
              Você está sendo redirecionado para o WhatsApp de Douglas Cardoso para alinhamento dos detalhes.
            </p>
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-full bg-white/10 text-white text-xs font-light tracking-widest uppercase hover:bg-white/20"
            >
              Fechar Janela
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
