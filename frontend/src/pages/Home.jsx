import { Link } from 'react-router-dom'

const sampleConversation = [
  {
    role: 'user',
    text: 'explain the difference between a stack and a queue',
  },
  {
    role: 'bot',
    text: 'A stack is LIFO — last in, first out, like a pile of plates. A queue is FIFO — first in, first out, like people waiting in line. Both store a sequence, but their access patterns are mirror images.',
    intent: 'explain_concept',
    confidence: 0.94,
    entities: ['stack', 'queue'],
  },
]

const pipeline = [
  {
    num: 'I',
    title: 'Preprocess',
    body: 'Lowercase, tokenize, and lemmatize with NLTK. "Running" and "ran" collapse into "run".',
  },
  {
    num: 'II',
    title: 'Vectorize',
    body: 'TF-IDF turns the normalized text into sparse numerical features, unigrams and bigrams.',
  },
  {
    num: 'III',
    title: 'Classify',
    body: 'A Multinomial Naive Bayes model predicts the intent and returns the probability for each class.',
  },
  {
    num: 'IV',
    title: 'Extract',
    body: 'Pattern matching pulls out named entities — programming languages, frameworks, concepts.',
  },
  {
    num: 'V',
    title: 'Respond',
    body: 'The winning intent selects a response from the knowledge base. No generation, no hallucination.',
  },
]

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto px-6 lg:px-10">
      {/* Masthead */}
      <header className="pt-20 pb-14 border-b border-rule">
        <p className="label mb-6">Vol. I · Issue 01 · NLP</p>
        <h1 className="display text-[48px] md:text-[88px] text-ink mb-6 max-w-5xl">
          A chatbot that <span className="display-italic">reads between</span> the lines.
        </h1>
        <p className="prose text-[20px] text-ink-soft max-w-3xl mb-8">
          LinguaBot classifies intent, pulls entities, and shows the whole pipeline in the
          margins — so you can see what the model is actually doing, not just what it said.
        </p>
        <div className="flex flex-wrap items-center gap-5">
          <Link to="/chat" className="btn-primary no-underline inline-block">
            Open a conversation
          </Link>
          <Link to="/analyze" className="btn-link no-underline inline-block">
            or inspect a sentence →
          </Link>
        </div>
      </header>

      {/* Sample conversation */}
      <section className="py-14 border-b border-rule">
        <p className="label mb-8">A specimen</p>
        <div className="space-y-6">
          <div className="flex justify-end">
            <div className="max-w-[75%]">
              <p className="dateline text-right mb-1.5">you · 14:02</p>
              <div className="bg-ink text-paper px-4 py-2.5 inline-block" style={{ borderRadius: '2px' }}>
                <p className="text-[14.5px] leading-relaxed">{sampleConversation[0].text}</p>
              </div>
            </div>
          </div>

          <div>
            <p className="dateline mb-1.5">LinguaBot · 14:02</p>
            <p className="prose text-[17px] text-ink max-w-2xl">
              {sampleConversation[1].text}
            </p>
            <p className="footnote mt-3 pl-4 border-l-2 border-accent-soft max-w-2xl">
              Intent: <span className="mono not-italic text-ink text-[12px]">explain_concept</span>
              {' '}· confidence <span className="mono not-italic text-ink text-[12px]">94.0%</span>
              {' '}· entities <span className="mono not-italic text-ink text-[12px]">stack, queue</span>.
            </p>
          </div>
        </div>
      </section>

      {/* Pipeline */}
      <section className="py-14 border-b border-rule">
        <p className="label mb-8">The pipeline, in five movements</p>
        <ol className="space-y-8">
          {pipeline.map(step => (
            <li key={step.num} className="grid grid-cols-[56px_1fr] gap-4">
              <span className="serif text-accent text-2xl" style={{ fontStyle: 'italic', fontWeight: 400 }}>
                {step.num}.
              </span>
              <div>
                <h3 className="serif text-ink text-xl mb-1" style={{ fontWeight: 500 }}>{step.title}</h3>
                <p className="prose text-[16px] text-ink-soft max-w-xl">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* Colophon */}
      <footer className="py-10 flex flex-wrap items-baseline justify-between gap-4">
        <div>
          <p className="label mb-2">Colophon</p>
          <p className="prose text-[14px] text-ink-soft max-w-md">
            Set in Fraunces and Inter. Built with Python, Flask, NLTK, scikit-learn, React, and Tailwind.
            Ships no neural network, hides no prompt.
          </p>
        </div>
        <p className="dateline">© LinguaBot</p>
      </footer>
    </div>
  )
}
