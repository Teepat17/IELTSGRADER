import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl">
            <span className="text-primary">IELTS</span> Writing Grader
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link href="/register">
              <Button>Register</Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="py-20 md:py-28">
          <div className="container flex flex-col items-center text-center">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">Grade Your IELTS Writing with AI</h1>
            <p className="text-xl text-muted-foreground max-w-[800px] mb-10">
              Get instant feedback and scores for your IELTS Writing Task 1 and Task 2 essays using our advanced AI
              grading system.
            </p>
            <Link href="/register">
              <Button size="lg" className="gap-2">
                Get Started <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </section>

        <section className="py-16 bg-muted">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center p-6 bg-background rounded-lg shadow-sm">
                <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4">
                  1
                </div>
                <h3 className="text-xl font-semibold mb-2">Upload Your Answer</h3>
                <p className="text-muted-foreground">
                  Upload a JPG image of your handwritten IELTS Writing Task 1 or Task 2 answer.
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-6 bg-background rounded-lg shadow-sm">
                <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4">
                  2
                </div>
                <h3 className="text-xl font-semibold mb-2">AI Grading</h3>
                <p className="text-muted-foreground">
                  Our AI analyzes your writing based on official IELTS scoring rubrics.
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-6 bg-background rounded-lg shadow-sm">
                <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4">
                  3
                </div>
                <h3 className="text-xl font-semibold mb-2">Get Detailed Feedback</h3>
                <p className="text-muted-foreground">
                  Receive your band score and detailed feedback to improve your writing skills.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container">
            <div className="flex flex-col md:flex-row gap-12 items-center">
              <div className="flex-1">
                <h2 className="text-3xl font-bold mb-6">Why Choose Our IELTS Grader?</h2>
                <ul className="space-y-4">
                  <li className="flex items-start gap-2">
                    <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center mt-0.5">
                      ✓
                    </div>
                    <div>
                      <span className="font-medium">Accurate Assessment</span>
                      <p className="text-muted-foreground">Our AI is trained on official IELTS scoring guidelines.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center mt-0.5">
                      ✓
                    </div>
                    <div>
                      <span className="font-medium">Detailed Feedback</span>
                      <p className="text-muted-foreground">Get specific suggestions to improve your writing.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center mt-0.5">
                      ✓
                    </div>
                    <div>
                      <span className="font-medium">Practice Unlimited</span>
                      <p className="text-muted-foreground">Upload multiple essays to track your progress over time.</p>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="flex-1">
                <img
                  src="/placeholder.svg?height=400&width=500"
                  alt="IELTS Writing Sample"
                  className="rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-8">
        <div className="container flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-muted-foreground">© 2025 IELTS Writing Grader. All rights reserved.</div>
          <div className="flex gap-6">
            <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground">
              About
            </Link>
            <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
              Privacy
            </Link>
            <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground">
              Terms
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
