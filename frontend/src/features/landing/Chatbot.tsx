"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquareIcon, XIcon, SendIcon } from "./icons";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(!isOpen)}
          className="bg-blue-600 text-white rounded-full p-4 shadow-lg hover:bg-blue-700 transition-colors"
          aria-label="Open chat"
        >
          <AnimatePresence>
            {isOpen ? (
              <motion.div
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
              >
                <XIcon className="w-8 h-8" />
              </motion.div>
            ) : (
              <motion.div
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
              >
                <MessageSquareIcon className="w-8 h-8" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed bottom-24 right-6 z-50 w-full max-w-sm bg-blue-950/80 backdrop-blur-lg border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
            style={{ height: "60vh" }}
          >
            {/* Header */}
            <div className="flex-shrink-0 p-4 border-b border-white/10 flex items-center justify-between">
              <h3 className="text-lg font-bold text-white">
                Asistente Virtual
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                <XIcon className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-grow p-4 space-y-4 overflow-y-auto">
              <div className="flex justify-start">
                <div className="bg-gray-700 text-white p-3 rounded-lg max-w-xs">
                  ¡Hola! Soy el asistente de ICM. ¿En qué puedo ayudarte hoy?
                </div>
              </div>
              <div className="flex justify-start">
                <div className="bg-gray-700 text-white p-3 rounded-lg max-w-xs">
                  Puedes preguntarme sobre nuestros servicios, certificaciones o
                  cómo contactarnos.
                </div>
              </div>
            </div>

            {/* Input */}
            <div className="flex-shrink-0 p-4 border-t border-white/10">
              <form className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Escribe tu mensaje..."
                  className="flex-grow bg-blue-900/50 border border-white/20 rounded-full py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  className="bg-blue-600 text-white rounded-full p-3 hover:bg-blue-700 transition-colors flex-shrink-0"
                >
                  <SendIcon className="w-5 h-5" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
