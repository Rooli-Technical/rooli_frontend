import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { ArrowLeft, Mail, Building2, Scale } from "lucide-react"
import Image from "next/image"

export const metadata = {
    title: "Terms and Conditions - Rooli",
    description: "Rooli Terms and Conditions of Service - Legal agreement for using Rooli",
}

export default function TermsConditionsPage() {
    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <span className="font-serif font-bold text-xl text-foreground">
                                <Image src="/logo.png" alt="Rooli" width={68} height={68} />
                            </span>
                        </div>
                        <Button variant="ghost" size="sm" asChild>
                            <Link href="/">
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Back to Home
                            </Link>
                        </Button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-4xl">
                <div className="mb-8">
                    <div className="flex items-center gap-2 mb-2">
                        <Scale className="w-8 h-8 text-primary" />
                        <h1 className="text-4xl font-bold text-foreground">Rooli Terms and Conditions of Service</h1>
                    </div>
                    <p className="text-muted-foreground">Effective Date: November, 2025</p>
                </div>

                <Card className="mb-8">
                    <CardContent className="pt-6">
                        <p className="text-foreground leading-relaxed">
                            These Terms and Conditions of Service (hereinafter, the "Agreement" or "Terms") constitute a legally binding contract between Cresthub Media, a technology and media company duly registered under the laws of the Federal Republic of Nigeria, with registration number 1913610 and its registered address at RAYFIELD, JOS, PLATEAU STATE, NIGERIA (hereinafter, "Cresthub Media," "we," "us," or "our"), and you, the entity or individual accessing or utilizing the Rooli AI-powered social media scheduling software (the "Service" or "Rooli") (hereinafter, the "User" or "you").
                        </p>
                        <p className="text-foreground leading-relaxed mt-4">
                            By accessing, registering for, or utilizing any aspect of the Service, you represent and warrant that you have read, understand, and agree to be bound by all clauses and provisions contained herein. If you do not agree to these Terms, you are expressly prohibited from using the Service and must discontinue use immediately.
                        </p>
                    </CardContent>
                </Card>

                {/* Section 1: Acceptance and Scope of Service */}
                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-foreground mb-4">1. Acceptance and Scope of Service</h2>
                    <Card>
                        <CardContent className="pt-6 space-y-4">
                            <div>
                                <h3 className="text-lg font-semibold text-foreground mb-2">1.1 Service Description</h3>
                                <p className="text-muted-foreground">
                                    Rooli is provided as a Software-as-a-Service (SaaS) platform designed to enable consolidated management and scheduled publishing across various third-party social media platforms, including, but not limited to, LinkedIn, X (formerly Twitter), Facebook, and Instagram.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-foreground mb-2">1.2 Eligibility and Authority</h3>
                                <p className="text-muted-foreground">
                                    The Service is restricted to Small to Large-Sized Business Teams, Marketing Agencies, Solo Founders and Regular individuals. By entering into this Agreement, you represent and warrant that you are at least 18 years of age and, if executing this Agreement on behalf of a company or legal entity, you have the requisite authority to bind that entity to these Terms.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-foreground mb-2">1.3 Free Trial and Conversion</h3>
                                <p className="text-muted-foreground">
                                    We may offer a 7-day free trial. Access during the trial is provided strictly on an "as-is" basis. Continuation of the Service beyond the trial requires conversion to a paid Subscription Plan.
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </section>

                {/* Section 2: Financial Terms and Subscription Management */}
                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-foreground mb-4">2. Financial Terms and Subscription Management</h2>
                    <Card>
                        <CardContent className="pt-6 space-y-4">
                            <div>
                                <h3 className="text-lg font-semibold text-foreground mb-2">2.1 Subscription Basis</h3>
                                <p className="text-muted-foreground">
                                    The Service is offered on a Subscription Basis with payment tiers available on both a monthly and annual frequency. You agree to pay the fees applicable to your selected Subscription Plan.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-foreground mb-2">2.2 Auto-Renewal and Payment</h3>
                                <p className="text-muted-foreground">
                                    Subscriptions will automatically renew for successive periods equal to the initial subscription term unless terminated prior to the renewal date. You hereby authorize Cresthub Media to charge the designated payment method for all applicable fees, taxes, and charges at the commencement of each renewal term.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-foreground mb-2">2.3 Non-Refundable Payments</h3>
                                <p className="text-muted-foreground">
                                    All fees paid for the Service are deemed earned upon payment and are strictly non-refundable. You acknowledge and accept that Cresthub Media shall have no obligation to issue a full or partial refund for any reason, including dissatisfaction, failure to utilize the Service, or early termination.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-foreground mb-2">2.4 Termination by User</h3>
                                <p className="text-muted-foreground">
                                    You may terminate your Subscription at any time through the Service dashboard. Termination will be effective at the conclusion of the then-current billing cycle. No refunds will be provided for any remaining, unused portion of the Subscription term upon cancellation.
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </section>

                {/* Section 3: User Representations, Warranties, and Indemnification */}
                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-foreground mb-4">3. User Representations, Warranties, and Indemnification</h2>
                    <Card>
                        <CardContent className="pt-6 space-y-4">
                            <div>
                                <h3 className="text-lg font-semibold text-foreground mb-2">3.1 Third-Party Platform Compliance</h3>
                                <p className="text-muted-foreground mb-2">
                                    You expressly represent and warrant that:
                                </p>
                                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                                    <li>You possess all necessary rights, licenses, and authorizations to connect your third-party social media accounts to Rooli.</li>
                                    <li>You bear sole and absolute responsibility for all content, data, and material scheduled, posted, or transmitted through the Service ("User Content").</li>
                                    <li>You shall ensure that all User Content and your method of using Rooli strictly adhere to the respective terms of service, acceptable use policies, community guidelines, and intellectual property rights of LinkedIn, X, Facebook, and Instagram, and any other connected platform.</li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-foreground mb-2">3.2 Indemnification</h3>
                                <p className="text-muted-foreground mb-2">
                                    You agree to indemnify, defend, and hold harmless Cresthub Media and its directors, officers, employees, and agents from and against any and all claims, liabilities, damages, losses, costs, and expenses, including reasonable attorney's fees, arising out of or in any way connected with:
                                </p>
                                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                                    <li>Your breach of the representations and warranties set forth in this Section 3.</li>
                                    <li>Any claim that your User Content or its use violates any third-party right, including copyright, trademark, privacy, or publicity rights.</li>
                                    <li>Any actions, suspensions, or terminations imposed upon your social media accounts by a third-party platform due to your use of Rooli.</li>
                                </ul>
                            </div>
                        </CardContent>
                    </Card>
                </section>

                {/* Section 4: Acceptable Use Policy */}
                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-foreground mb-4">4. Acceptable Use Policy (AUP)</h2>
                    <Card>
                        <CardContent className="pt-6 space-y-4">
                            <div>
                                <h3 className="text-lg font-semibold text-foreground mb-2">4.1 Prohibited Conduct</h3>
                                <p className="text-muted-foreground mb-2">
                                    You agree that the Service shall not be used for any unlawful purpose or in any manner that violates or breaches this Agreement or the policies of third-party platform providers. Prohibited conduct includes, but is not limited to:
                                </p>
                                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                                    <li>The creation or management of accounts utilizing bulk account creation tools or methodologies.</li>
                                    <li>Any activity that attempts to manipulate, disrupt, or harm the integrity, security, or performance of the Service or the APIs of our third-party partners.</li>
                                    <li>The scheduling of content that is defamatory, fraudulent, obscene, illegal, or that constitutes unsolicited commercial communications ("spam") in violation of applicable laws.</li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-foreground mb-2">4.2 API and Partner Integrity</h3>
                                <p className="text-muted-foreground">
                                    Your use of the Service must be consistent with the reasonable operational parameters and ethical standards dictated by our integration partners. Cresthub Media reserves the right, in its sole and absolute discretion, to determine if your usage pattern compromises the integrity of our API access or relationship with a third party, and may immediately suspend or terminate your account without notice.
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </section>

                {/* Section 5: Disclaimer of Warranties and Limitation of Liability */}
                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-foreground mb-4">5. Disclaimer of Warranties and Limitation of Liability</h2>
                    <Card>
                        <CardContent className="pt-6 space-y-4">
                            <div>
                                <h3 className="text-lg font-semibold text-foreground mb-2">5.1 No Warranty</h3>
                                <p className="text-muted-foreground font-medium">
                                    THE SERVICE IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS. CRESTHUB MEDIA MAKES NO WARRANTIES, EXPRESS OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT. WE DO NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED, SECURE, OR ERROR-FREE, NOR DO WE MAKE ANY WARRANTY AS TO THE RESULTS THAT MAY BE OBTAINED FROM THE USE OF THE SERVICE.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-foreground mb-2">5.2 Limitation of Liability</h3>
                                <p className="text-muted-foreground font-medium">
                                    IN NO EVENT SHALL CRESTHUB MEDIA BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION, LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM (i) YOUR ACCESS TO OR USE OF OR INABILITY TO ACCESS OR USE THE SERVICE; (ii) ANY CONDUCT OR CONTENT OF ANY THIRD PARTY ON THE SERVICE; (iii) ANY DAMAGE TO YOUR SOCIAL MEDIA ACCOUNTS OR LOSS OF ACCESS THERETO BY REASON OF THIRD-PARTY ACTIONS; (iv) UNAUTHORIZED ACCESS, USE, OR ALTERATION OF YOUR TRANSMISSIONS OR CONTENT. OUR TOTAL AGGREGATE LIABILITY TO YOU FOR ANY AND ALL CLAIMS ARISING OUT OF OR RELATING TO THIS AGREEMENT IS LIMITED TO THE AMOUNT PAID BY YOU FOR THE SERVICE IN THE SIX (6) MONTHS IMMEDIATELY PRECEDING THE EVENT GIVING RISE TO THE CLAIM.
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </section>

                {/* Section 6: Governing Law and Dispute Resolution */}
                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-foreground mb-4">6. Governing Law and Dispute Resolution</h2>
                    <Card>
                        <CardContent className="pt-6 space-y-4">
                            <div>
                                <h3 className="text-lg font-semibold text-foreground mb-2">6.1 Governing Law</h3>
                                <p className="text-muted-foreground">
                                    This Agreement, and your use of the Service, shall be construed and governed exclusively in accordance with the Laws of the Federal Republic of Nigeria, without regard to its conflict of law principles.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-foreground mb-2">6.2 Jurisdiction</h3>
                                <p className="text-muted-foreground">
                                    The parties irrevocably submit to the exclusive jurisdiction of the courts located within Nigeria for the resolution of any disputes arising under or in connection with this Agreement.
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </section>

                {/* Section 7: Miscellaneous Provisions */}
                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-foreground mb-4">7. Miscellaneous Provisions</h2>
                    <Card>
                        <CardContent className="pt-6 space-y-4">
                            <div>
                                <h3 className="text-lg font-semibold text-foreground mb-2">7.1 Entire Agreement</h3>
                                <p className="text-muted-foreground">
                                    This Agreement constitutes the entire agreement between you and Cresthub Media concerning the subject matter hereof, superseding any prior agreements, representations, or understandings.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-foreground mb-2">7.2 Modifications</h3>
                                <p className="text-muted-foreground">
                                    Cresthub Media reserves the right to modify or replace these Terms at any time. We will provide at least thirty (30) days' notice prior to any new terms taking effect. Continued use of the Service after the effective date of the revised Terms constitutes acceptance of the new Terms.
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </section>

                {/* Section 8: Contact Information */}
                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-foreground mb-4">8. Contact Information</h2>
                    <Card>
                        <CardContent className="pt-6">
                            <p className="text-foreground mb-4">
                                For any legal inquiries regarding these Terms and Conditions, please contact us at:
                            </p>
                            <div className="space-y-3">
                                <div className="flex items-start">
                                    <Mail className="w-5 h-5 mr-3 mt-0.5 text-primary" />
                                    <div>
                                        <p className="font-semibold text-foreground">Email:</p>
                                        <p className="text-muted-foreground">Rooli[at]cresthub.com</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <Building2 className="w-5 h-5 mr-3 mt-0.5 text-primary" />
                                    <div>
                                        <p className="font-semibold text-foreground">Company:</p>
                                        <p className="text-muted-foreground">Cresthub Media</p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </section>

                {/* Footer Navigation */}
                <div className="mt-12 pt-8 border-t border-border flex justify-center">
                    <Button variant="outline" asChild>
                        <Link href="/">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Home
                        </Link>
                    </Button>
                </div>
            </main>
        </div>
    )
}