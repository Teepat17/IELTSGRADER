import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

interface BandScoreExplanationProps {
  taskType: "task1" | "task2"
}

export function BandScoreExplanation({ taskType }: BandScoreExplanationProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>IELTS Writing {taskType === "task1" ? "Task 1" : "Task 2"} Band Score Explanation</CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          {taskType === "task1" ? (
            <>
              <AccordionItem value="task-achievement">
                <AccordionTrigger>Task Achievement</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2 text-sm">
                    <div>
                      <p className="font-medium">Band 9</p>
                      <p>• fully satisfies all the requirements of the task</p>
                      <p>• clearly presents a fully developed response</p>
                    </div>
                    <div>
                      <p className="font-medium">Band 8</p>
                      <p>• covers all requirements of the task sufficiently</p>
                      <p>• presents, highlights and illustrates key features/bullet points clearly and appropriately</p>
                    </div>
                    <div>
                      <p className="font-medium">Band 7</p>
                      <p>• covers the requirements of the task</p>
                      <p>• (A) presents a clear overview of main trends, differences or stages</p>
                      <p>• (GT) presents a clear purpose, with the tone consistent and appropriate</p>
                      <p>
                        • clearly presents and highlights key features/bullet points but could be more fully extended
                      </p>
                    </div>
                    <div>
                      <p className="font-medium">Band 6</p>
                      <p>• addresses the requirements of the task</p>
                      <p>• (A) presents an overview with information appropriately selected</p>
                      <p>• (GT) presents a purpose that is generally clear; there may be inconsistencies in tone</p>
                      <p>
                        • presents and adequately highlights key features/bullet points but details may be irrelevant,
                        inaccurate
                      </p>
                    </div>
                    <div>
                      <p className="font-medium">Band 5</p>
                      <p>• generally addresses the task; the format may be inappropriate in places</p>
                      <p>
                        • (A) recounts detail mechanically with no clear overview; there may be no data to support the
                        description
                      </p>
                      <p>
                        • (GT) may present a purpose for the letter that is unclear at times; the tone may be variable
                        and sometimes inappropriate
                      </p>
                      <p>
                        • presents, but inadequately covers, key features/bullet points; there may be a tendency to
                        focus on details
                      </p>
                    </div>
                    <div>
                      <p className="font-medium">Band 4 and below</p>
                      <p>
                        • attempts to address the task but does not cover all key features/bullet points; the format may
                        be inappropriate
                      </p>
                      <p>• (GT) fails to clearly explain the purpose of the letter; the tone may be inappropriate</p>
                      <p>
                        • may confuse key features/bullet points with detail; parts may be unclear, irrelevant,
                        repetitive or inaccurate
                      </p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="coherence-cohesion">
                <AccordionTrigger>Coherence and Cohesion</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2 text-sm">
                    <div>
                      <p className="font-medium">Band 9</p>
                      <p>• uses cohesion in such a way that it attracts no attention</p>
                      <p>• skillfully manages paragraphing</p>
                    </div>
                    <div>
                      <p className="font-medium">Band 8</p>
                      <p>• sequences information and ideas logically</p>
                      <p>• manages all aspects of cohesion well</p>
                      <p>• uses paragraphing sufficiently and appropriately</p>
                    </div>
                    <div>
                      <p className="font-medium">Band 7</p>
                      <p>• logically organises information and ideas; there is clear progression throughout</p>
                      <p>• uses a range of cohesive devices appropriately although there may be some under-/over-use</p>
                    </div>
                    <div>
                      <p className="font-medium">Band 6</p>
                      <p>• arranges information and ideas coherently and there is a clear overall progression</p>
                      <p>
                        • uses cohesive devices effectively, but cohesion within and/or between sentences may be faulty
                        or mechanical
                      </p>
                      <p>• may not always use referencing clearly or appropriately</p>
                    </div>
                    <div>
                      <p className="font-medium">Band 5</p>
                      <p>
                        • presents information with some organisation but there may be a lack of overall progression
                      </p>
                      <p>• makes inadequate, inaccurate or over-use of cohesive devices</p>
                      <p>• may be repetitive because of lack of referencing and substitution</p>
                    </div>
                    <div>
                      <p className="font-medium">Band 4 and below</p>
                      <p>
                        • presents information and ideas but these are not arranged coherently and there is no clear
                        progression in the response
                      </p>
                      <p>• uses some basic cohesive devices but these may be inaccurate or repetitive</p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="lexical-resource">
                <AccordionTrigger>Lexical Resource</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2 text-sm">
                    <div>
                      <p className="font-medium">Band 9</p>
                      <p>
                        • uses a wide range of vocabulary with very natural and sophisticated control of lexical
                        features; rare minor errors occur only as 'slips'
                      </p>
                    </div>
                    <div>
                      <p className="font-medium">Band 8</p>
                      <p>• uses a wide range of vocabulary fluently and flexibly to convey precise meanings</p>
                      <p>
                        • skillfully uses uncommon lexical items but there may be occasional inaccuracies in word choice
                        and collocation
                      </p>
                      <p>• produces rare errors in spelling and/or word formation</p>
                    </div>
                    <div>
                      <p className="font-medium">Band 7</p>
                      <p>• uses a sufficient range of vocabulary to allow some flexibility and precision</p>
                      <p>• uses less common lexical items with some awareness of style and collocation</p>
                      <p>• may produce occasional errors in word choice, spelling and/or word formation</p>
                    </div>
                    <div>
                      <p className="font-medium">Band 6</p>
                      <p>• uses an adequate range of vocabulary for the task</p>
                      <p>• attempts to use less common vocabulary but with some inaccuracy</p>
                      <p>• makes some errors in spelling and/or word formation, but they do not impede communication</p>
                    </div>
                    <div>
                      <p className="font-medium">Band 5</p>
                      <p>• uses a limited range of vocabulary, but this is minimally adequate for the task</p>
                      <p>
                        • may make noticeable errors in spelling and/or word formation that may cause some difficulty
                        for the reader
                      </p>
                    </div>
                    <div>
                      <p className="font-medium">Band 4 and below</p>
                      <p>
                        • uses only basic vocabulary which may be used repetitively or which may be inappropriate for
                        the task
                      </p>
                      <p>
                        • has limited control of word formation and/or spelling; errors may cause strain for the reader
                      </p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="grammatical-range">
                <AccordionTrigger>Grammatical Range and Accuracy</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2 text-sm">
                    <div>
                      <p className="font-medium">Band 9</p>
                      <p>
                        • uses a wide range of structures with full flexibility and accuracy; rare minor errors occur
                        only as 'slips'
                      </p>
                    </div>
                    <div>
                      <p className="font-medium">Band 8</p>
                      <p>• uses a wide range of structures</p>
                      <p>• the majority of sentences are error-free</p>
                      <p>• makes only very occasional errors or inappropriacies</p>
                    </div>
                    <div>
                      <p className="font-medium">Band 7</p>
                      <p>• uses a variety of complex structures</p>
                      <p>• produces frequent error-free sentences</p>
                      <p>• has good control of grammar and punctuation but may make a few errors</p>
                    </div>
                    <div>
                      <p className="font-medium">Band 6</p>
                      <p>• uses a mix of simple and complex sentence forms</p>
                      <p>• makes some errors in grammar and punctuation but they rarely reduce communication</p>
                    </div>
                    <div>
                      <p className="font-medium">Band 5</p>
                      <p>• uses only a limited range of structures</p>
                      <p>• attempts complex sentences but these tend to be less accurate than simple sentences</p>
                      <p>
                        • may make frequent grammatical errors and punctuation may be faulty; errors can cause some
                        difficulty for the reader
                      </p>
                    </div>
                    <div>
                      <p className="font-medium">Band 4 and below</p>
                      <p>• uses only a very limited range of structures with only rare use of subordinate clauses</p>
                      <p>• some structures are accurate but errors predominate, and punctuation is often faulty</p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </>
          ) : (
            <>
              <AccordionItem value="task-response">
                <AccordionTrigger>Task Response</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2 text-sm">
                    <div>
                      <p className="font-medium">Band 9</p>
                      <p>• Fully addresses all parts of the task</p>
                      <p>• Presents a fully developed position in answer to the question with relevant, fully extended and well supported ideas</p>
                    </div>
                    <div>
                      <p className="font-medium">Band 8</p>
                      <p>• Sufficiently addresses all parts of the task</p>
                      <p>• Presents a well-developed response to the question with relevant, extended and supported ideas</p>
                    </div>
                    <div>
                      <p className="font-medium">Band 7</p>
                      <p>• Addresses all parts of the task</p>
                      <p>• Presents a clear position throughout the response</p>
                      <p>• Presents, extends and supports main ideas, but there may be a tendency to over-generalize and/or supporting ideas may lack focus</p>
                    </div>
                    <div>
                      <p className="font-medium">Band 6</p>
                      <p>• Addresses all parts of the task although some parts may be more fully covered than others</p>
                      <p>• Presents a relevant position although the conclusions may become unclear or repetitive</p>
                      <p>• Presents relevant main ideas but some may be inadequately developed/unclear</p>
                    </div>
                    <div>
                      <p className="font-medium">Band 5</p>
                      <p>• Addresses the task only partially</p>
                      <p>• Expresses a position but the development is not always clear and there may be no conclusions drawn</p>
                      <p>• Presents some main ideas but these are limited and not sufficiently developed; there may be irrelevant detail</p>
                    </div>
                    <div>
                      <p className="font-medium">Band 4 and below</p>
                      <p>• Responds to the task only in a minimal way or the answer is tangential</p>
                      <p>• The position may be unclear</p>
                      <p>• Presents few ideas, which are largely undeveloped or irrelevant</p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="coherence-cohesion">
                <AccordionTrigger>Coherence and Cohesion</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2 text-sm">
                    <div>
                      <p className="font-medium">Band 9</p>
                      <p>• Uses cohesion in such a way that it attracts no attention</p>
                      <p>• Skillfully manages paragraphing</p>
                    </div>
                    <div>
                      <p className="font-medium">Band 8</p>
                      <p>• Sequences information and ideas logically</p>
                      <p>• Manages all aspects of cohesion well</p>
                      <p>• Uses paragraphing sufficiently and appropriately</p>
                    </div>
                    <div>
                      <p className="font-medium">Band 7</p>
                      <p>• Logically organizes information and ideas with clear progression</p>
                      <p>• Uses a range of cohesive devices appropriately although there may be some under/over-use</p>
                    </div>
                    <div>
                      <p className="font-medium">Band 6</p>
                      <p>• Arranges information and ideas coherently with clear overall progression</p>
                      <p>• Uses cohesive devices effectively, but cohesion within/between sentences may be faulty or mechanical</p>
                      <p>• May not always use referencing clearly or appropriately</p>
                    </div>
                    <div>
                      <p className="font-medium">Band 5</p>
                      <p>• Presents information with some organization but may lack overall progression</p>
                      <p>• Makes inadequate, inaccurate or over-use of cohesive devices</p>
                      <p>• May be repetitive due to lack of referencing and substitution</p>
                    </div>
                    <div>
                      <p className="font-medium">Band 4 and below</p>
                      <p>• Presents information and ideas but these are not arranged coherently and there is no clear progression</p>
                      <p>• Uses some basic cohesive devices but these may be inaccurate or repetitive</p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="lexical-resource">
                <AccordionTrigger>Lexical Resource</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2 text-sm">
                    <div>
                      <p className="font-medium">Band 9</p>
                      <p>• Uses a wide range of vocabulary with very natural and sophisticated control of lexical features</p>
                      <p>• Rare minor errors occur only as 'slips'</p>
                    </div>
                    <div>
                      <p className="font-medium">Band 8</p>
                      <p>• Uses a wide range of vocabulary fluently and flexibly to convey precise meanings</p>
                      <p>• Skillfully uses uncommon lexical items but there may be occasional inaccuracies in word choice and collocation</p>
                      <p>• Produces rare errors in spelling and/or word formation</p>
                    </div>
                    <div>
                      <p className="font-medium">Band 7</p>
                      <p>• Uses a sufficient range of vocabulary to allow some flexibility and precision</p>
                      <p>• Uses less common lexical items with some awareness of style and collocation</p>
                      <p>• May produce occasional errors in word choice, spelling and/or word formation</p>
                    </div>
                    <div>
                      <p className="font-medium">Band 6</p>
                      <p>• Uses an adequate range of vocabulary for the task</p>
                      <p>• Attempts to use less common vocabulary but with some inaccuracy</p>
                      <p>• Makes some errors in spelling and/or word formation, but they do not impede communication</p>
                    </div>
                    <div>
                      <p className="font-medium">Band 5</p>
                      <p>• Uses a limited range of vocabulary, but this is minimally adequate for the task</p>
                      <p>• May make noticeable errors in spelling and/or word formation that may cause some difficulty for the reader</p>
                    </div>
                    <div>
                      <p className="font-medium">Band 4 and below</p>
                      <p>• Uses only basic vocabulary which may be used repetitively or which may be inappropriate for the task</p>
                      <p>• Has limited control of word formation and/or spelling; errors may cause strain for the reader</p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="grammatical-range">
                <AccordionTrigger>Grammatical Range and Accuracy</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2 text-sm">
                    <div>
                      <p className="font-medium">Band 9</p>
                      <p>• Uses a wide range of structures with full flexibility and accuracy</p>
                      <p>• Rare minor errors occur only as 'slips'</p>
                    </div>
                    <div>
                      <p className="font-medium">Band 8</p>
                      <p>• Uses a wide range of structures</p>
                      <p>• The majority of sentences are error-free</p>
                      <p>• Makes only very occasional errors or inappropriacies</p>
                    </div>
                    <div>
                      <p className="font-medium">Band 7</p>
                      <p>• Uses a variety of complex structures</p>
                      <p>• Produces frequent error-free sentences</p>
                      <p>• Has good control of grammar and punctuation but may make a few errors</p>
                    </div>
                    <div>
                      <p className="font-medium">Band 6</p>
                      <p>• Uses a mix of simple and complex sentence forms</p>
                      <p>• Makes some errors in grammar and punctuation but they rarely reduce communication</p>
                    </div>
                    <div>
                      <p className="font-medium">Band 5</p>
                      <p>• Uses only a limited range of structures</p>
                      <p>• Attempts complex sentences but these tend to be less accurate than simple sentences</p>
                      <p>• May make frequent grammatical errors and punctuation may be faulty; errors can cause some difficulty for the reader</p>
                    </div>
                    <div>
                      <p className="font-medium">Band 4 and below</p>
                      <p>• Uses only a very limited range of structures with only rare use of subordinate clauses</p>
                      <p>• Some structures are accurate but errors predominate, and punctuation is often faulty</p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </>
          )}
        </Accordion>
      </CardContent>
    </Card>
  )
}
