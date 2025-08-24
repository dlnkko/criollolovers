'use client'

import { useState, useEffect } from 'react'

interface AnimatedTextProps {
  words: string[]
  className?: string
  typeSpeed?: number
  deleteSpeed?: number
  pauseTime?: number
}

export default function AnimatedText({ 
  words, 
  className = '',
  typeSpeed = 100,
  deleteSpeed = 50,
  pauseTime = 1000 
}: AnimatedTextProps) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [currentText, setCurrentText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [isTyping, setIsTyping] = useState(true)

  useEffect(() => {
    const currentWord = words[currentWordIndex]
    
    if (isTyping && !isDeleting) {
      // Escribiendo la palabra
      if (currentText.length < currentWord.length) {
        const timeout = setTimeout(() => {
          setCurrentText(currentWord.slice(0, currentText.length + 1))
        }, typeSpeed)
        return () => clearTimeout(timeout)
      } else {
        // Palabra completa, pausar y luego empezar a borrar
        const timeout = setTimeout(() => {
          setIsTyping(false)
          setIsDeleting(true)
        }, pauseTime)
        return () => clearTimeout(timeout)
      }
    } else if (isDeleting) {
      // Borrando la palabra
      if (currentText.length > 0) {
        const timeout = setTimeout(() => {
          setCurrentText(currentText.slice(0, currentText.length - 1))
        }, deleteSpeed)
        return () => clearTimeout(timeout)
      } else {
        // Palabra borrada, pasar a la siguiente
        setIsDeleting(false)
        setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length)
        setIsTyping(true)
      }
    }
  }, [currentText, currentWordIndex, isTyping, isDeleting, words, typeSpeed, deleteSpeed, pauseTime])

  return (
    <span className={className}>
      {currentText}
      <span className="animate-pulse">|</span>
    </span>
  )
}
