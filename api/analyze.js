export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { essay, goal, topic } = req.body;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [{
          role: 'system',
          content: `Ты — строгий преподаватель английского. Проанализируй текст пользователя.
          Верни ТОЛЬКО JSON в формате:
          {
            "grammar": {"score": 7.5, "errors": [{"text": "ошибка", "correction": "исправление", "explanation": "пояснение"}]},
            "vocabulary": {"score": 8.0, "suggestions": [{"original": "слово", "synonym": "синоним"}], "comment": "комментарий"},
            "style": {"score": 8.5, "comment": "комментарий по стилю", "tone": "формальный/неформальный"},
            "structure": {"score": 7.0, "comment": "комментарий по структуре"}
          }
          Оценки от 1 до 9.`
        }, {
          role: 'user',
          content: `Цель: ${goal}\nТема: ${topic}\nТекст:\n${essay}`
        }],
        max_tokens: 800,
        temperature: 0.3,
        response_format: { type: 'json_object' }
      })
    });

    const data = await response.json();
    const result = JSON.parse(data.choices[0].message.content);
    
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}