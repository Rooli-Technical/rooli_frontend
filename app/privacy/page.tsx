import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { ArrowLeft, Mail, MapPin, Building2 } from "lucide-react"

export const metadata = {
    title: "Privacy Policy - Rooli",
    description: "Rooli Privacy Policy - How we collect, use, and protect your personal data",
}

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                                <span className="text-primary-foreground font-bold text-lg">R</span>
                            </div>
                            <span className="font-serif font-bold text-xl text-foreground">Rooli</span>
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
                    <h1 className="text-4xl font-bold text-foreground mb-2">Rooli Privacy Policy</h1>
                    <p className="text-muted-foreground">Effective Date: November, 2025</p>
                </div>

                <Card className="mb-8">
                    <CardContent className="pt-6">
                        <p className="text-foreground leading-relaxed">
                            This Privacy Policy explains how Cresthub Media (Reg: 1913610), the owner and operator of the Rooli AI-powered social media scheduling Service (the "Service" or "Rooli"), collects, uses, protects, and discloses Personal Data from its Users.
                        </p>
                        <p className="text-foreground leading-relaxed mt-4">
                            We are committed to processing Personal Data in compliance with the Nigeria Data Protection Act (NDPA) 2023 and other applicable laws. Cresthub Media acts as the Data Controller concerning the data collected directly from our Users.
                        </p>
                    </CardContent>
                </Card>

                {/* Section 1: Definitions */}
                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-foreground mb-4">1. Definitions</h2>
                    <Card>
                        <CardContent className="pt-6 space-y-3">
                            <div>
                                <p className="font-semibold text-foreground">Personal Data:</p>
                                <p className="text-muted-foreground">Any information relating directly or indirectly to an identified or identifiable natural person (Data Subject).</p>
                            </div>
                            <div>
                                <p className="font-semibold text-foreground">Data Controller:</p>
                                <p className="text-muted-foreground">Cresthub Media, the entity that determines the purposes and means of processing Personal Data.</p>
                            </div>
                            <div>
                                <p className="font-semibold text-foreground">Data Subject:</p>
                                <p className="text-muted-foreground">The identified or identifiable natural person to whom the Personal Data relates (i.e., you, the User).</p>
                            </div>
                            <div>
                                <p className="font-semibold text-foreground">Processing:</p>
                                <p className="text-muted-foreground">Any operation performed on Personal Data (e.g., collection, storage, use, disclosure).</p>
                            </div>
                        </CardContent>
                    </Card>
                </section>

                {/* Section 2: Personal Data We Collect */}
                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-foreground mb-4">2. Personal Data We Collect</h2>
                    <p className="text-muted-foreground mb-4">We collect and process the following categories of Personal Data:</p>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="overflow-x-auto">
                                <table className="w-full border-collapse">
                                    <thead>
                                        <tr className="border-b border-border">
                                            <th className="text-left p-3 font-semibold text-foreground">Data Category</th>
                                            <th className="text-left p-3 font-semibold text-foreground">Examples of Data Collected</th>
                                            <th className="text-left p-3 font-semibold text-foreground">Purpose of Processing (Lawful Basis)</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="border-b border-border">
                                            <td className="p-3 font-medium text-foreground">A. Account Data</td>
                                            <td className="p-3 text-muted-foreground">Name, Email Address, Phone Number, Company Name, Job Title.</td>
                                            <td className="p-3 text-muted-foreground">Contractual necessity (To provide the Service and manage the User account).</td>
                                        </tr>
                                        <tr className="border-b border-border">
                                            <td className="p-3 font-medium text-foreground">B. Financial Data</td>
                                            <td className="p-3 text-muted-foreground">Billing address, payment card details (securely transmitted to our payment processor, not stored by us).</td>
                                            <td className="p-3 text-muted-foreground">Contractual necessity (To process subscription payments).</td>
                                        </tr>
                                        <tr className="border-b border-border">
                                            <td className="p-3 font-medium text-foreground">C. Authentication Data</td>
                                            <td className="p-3 text-muted-foreground">API Tokens / OAuth Credentials for LinkedIn, X, Facebook, Instagram.</td>
                                            <td className="p-3 text-muted-foreground">Consent and Contractual necessity (To connect and manage the User's social media accounts as instructed).</td>
                                        </tr>
                                        <tr className="border-b border-border">
                                            <td className="p-3 font-medium text-foreground">D. Service Usage Data</td>
                                            <td className="p-3 text-muted-foreground">IP address, browser type, operating system, pages visited, time spent, scheduling frequency.</td>
                                            <td className="p-3 text-muted-foreground">Legitimate interest (To maintain, secure, and improve the performance and user experience of Rooli).</td>
                                        </tr>
                                        <tr>
                                            <td className="p-3 font-medium text-foreground">E. Content Data</td>
                                            <td className="p-3 text-muted-foreground">The text, images, videos, and media files scheduled by the User (but not directly posted by us).</td>
                                            <td className="p-3 text-muted-foreground">Contractual necessity (To execute the core function of the Rooli scheduler).</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </CardContent>
                    </Card>
                </section>

                {/* Section 3: How We Use Your Personal Data */}
                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-foreground mb-4">3. How We Use Your Personal Data</h2>
                    <Card>
                        <CardContent className="pt-6">
                            <p className="text-foreground mb-4">
                                We process your Personal Data on the basis of your Consent and Contractual Necessity for the following purposes:
                            </p>
                            <ul className="space-y-3 text-muted-foreground">
                                <li className="flex items-start">
                                    <span className="mr-2">•</span>
                                    <span><strong className="text-foreground">To Provide and Maintain the Service:</strong> To operate Rooli, manage your subscription, and execute your scheduled posts on third-party platforms.</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="mr-2">•</span>
                                    <span><strong className="text-foreground">To Process Transactions:</strong> To manage payments, billing, and invoices related to your Subscription Plan.</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="mr-2">•</span>
                                    <span><strong className="text-foreground">To Communicate with You:</strong> To send service-related notices, security alerts, and customer support responses.</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="mr-2">•</span>
                                    <span><strong className="text-foreground">For Security and Fraud Prevention:</strong> To protect Rooli and our Users from malicious activity.</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="mr-2">•</span>
                                    <span><strong className="text-foreground">For Service Improvement:</strong> To monitor usage trends, diagnose technical problems, and enhance our AI and scheduling features (using aggregated or anonymized data where possible).</span>
                                </li>
                            </ul>
                        </CardContent>
                    </Card>
                </section>

                {/* Section 4: Disclosure and Sharing */}
                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-foreground mb-4">4. Disclosure and Sharing of Personal Data</h2>
                    <Card>
                        <CardContent className="pt-6">
                            <p className="text-foreground mb-4">
                                We only share Personal Data when necessary to provide the Service or when legally required.
                            </p>

                            <div className="space-y-4">
                                <div>
                                    <h3 className="text-lg font-semibold text-foreground mb-2">4.1 Third-Party Social Media Platforms</h3>
                                    <p className="text-muted-foreground">
                                        When you connect your accounts (LinkedIn, X, Facebook, Instagram), you explicitly authorize Rooli to share only the necessary credentials (via secure tokens) and your User Content (E) with these platforms to enable posting on your behalf. We do not control the privacy practices of these third parties. Your use of Rooli is subject to their respective privacy policies.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-lg font-semibold text-foreground mb-2">4.2 Service Providers</h3>
                                    <p className="text-muted-foreground mb-2">
                                        We engage third-party companies and individuals to facilitate our Service ("Data Processors"). These include:
                                    </p>
                                    <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                                        <li>Payment Processors: To handle subscription fees securely.</li>
                                        <li>Hosting Providers: To store the Service data.</li>
                                        <li>Analytics Providers: To monitor and analyze Service use.</li>
                                    </ul>
                                    <p className="text-muted-foreground mt-2">
                                        These Data Processors are bound by written contractual obligations to implement appropriate data security measures and use your Personal Data only for the purposes directed by Cresthub Media.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-lg font-semibold text-foreground mb-2">4.3 Legal Requirements</h3>
                                    <p className="text-muted-foreground mb-2">
                                        Cresthub Media may disclose your Personal Data in the good faith belief that such action is necessary to:
                                    </p>
                                    <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                                        <li>Comply with a legal obligation (e.g., Nigerian court order or subpoena).</li>
                                        <li>Protect and defend the rights or property of Cresthub Media.</li>
                                        <li>Prevent or investigate possible wrongdoing in connection with the Service.</li>
                                        <li>Protect the personal safety of Users or the public.</li>
                                    </ul>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </section>

                {/* Section 5: Cross-Border Data Transfer */}
                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-foreground mb-4">5. Cross-Border Data Transfer</h2>
                    <Card>
                        <CardContent className="pt-6">
                            <p className="text-foreground leading-relaxed">
                                As a Nigeria-registered entity, we primarily operate in Nigeria. However, to provide the Service, your Personal Data may be transferred to, and maintained on, computers located outside of Nigeria.
                            </p>
                            <p className="text-foreground leading-relaxed mt-4">
                                We will take all necessary steps to ensure that your data is treated securely and that the transfer is only performed to jurisdictions that provide an adequate level of protection in line with the NDPA 2023, or where appropriate safeguards (such as standard contractual clauses) are implemented.
                            </p>
                        </CardContent>
                    </Card>
                </section>

                {/* Section 6: Data Security */}
                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-foreground mb-4">6. Data Security</h2>
                    <Card>
                        <CardContent className="pt-6">
                            <p className="text-foreground leading-relaxed">
                                We employ robust technical and organizational measures to protect your Personal Data from unauthorized access, accidental loss, disclosure, alteration, or destruction. These measures include data encryption, secure data transmission (SSL / TLS), access controls, and regular vulnerability testing.
                            </p>
                        </CardContent>
                    </Card>
                </section>

                {/* Section 7: Data Retention */}
                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-foreground mb-4">7. Data Retention</h2>
                    <Card>
                        <CardContent className="pt-6">
                            <p className="text-foreground leading-relaxed">
                                We will retain your Personal Data only for as long as is necessary for the purposes set out in this Privacy Policy, typically for the duration of your active subscription and a reasonable period thereafter to comply with our legal obligations. Authentication Data (C) is immediately deleted upon account disconnection or closure.
                            </p>
                        </CardContent>
                    </Card>
                </section>

                {/* Section 8: Your Data Subject Rights */}
                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-foreground mb-4">8. Your Data Subject Rights (NDPA 2023)</h2>
                    <Card>
                        <CardContent className="pt-6">
                            <p className="text-foreground mb-4">
                                As a Data Subject under Nigerian law, you possess the following rights regarding your Personal Data:
                            </p>
                            <ul className="space-y-3 text-muted-foreground">
                                <li className="flex items-start">
                                    <span className="mr-2">•</span>
                                    <span><strong className="text-foreground">Right to be Informed:</strong> The right to be informed about the use of your Personal Data (as detailed in this Policy).</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="mr-2">•</span>
                                    <span><strong className="text-foreground">Right of Access:</strong> The right to request and receive a copy of your Personal Data we hold.</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="mr-2">•</span>
                                    <span><strong className="text-foreground">Right to Rectification:</strong> The right to request correction of inaccurate or incomplete Personal Data.</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="mr-2">•</span>
                                    <span><strong className="text-foreground">Right to Object:</strong> The right to object to the processing of your Personal Data.</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="mr-2">•</span>
                                    <span><strong className="text-foreground">Right to Restriction of Processing:</strong> The right to request the suspension of processing under certain conditions.</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="mr-2">•</span>
                                    <span><strong className="text-foreground">Right to Data Portability:</strong> The right to receive your Personal Data in a structured, commonly used format.</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="mr-2">•</span>
                                    <span><strong className="text-foreground">Right to Erasure ("Right to be Forgotten"):</strong> The right to request the deletion of your Personal Data, subject to legal and contractual exceptions.</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="mr-2">•</span>
                                    <span><strong className="text-foreground">Right to Withdraw Consent:</strong> The right to withdraw your consent at any time where consent is the lawful basis for processing.</span>
                                </li>
                            </ul>
                            <p className="text-foreground mt-4">
                                To exercise any of these rights, please contact us using the details in Section 10.
                            </p>
                        </CardContent>
                    </Card>
                </section>

                {/* Section 9: Changes to Privacy Policy */}
                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-foreground mb-4">9. Changes to This Privacy Policy</h2>
                    <Card>
                        <CardContent className="pt-6">
                            <p className="text-foreground leading-relaxed">
                                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Effective Date." We will notify you via email or a prominent notice on the Service, prior to the change becoming effective.
                            </p>
                        </CardContent>
                    </Card>
                </section>

                {/* Section 10: Contact Information */}
                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-foreground mb-4">10. Contact Information</h2>
                    <Card>
                        <CardContent className="pt-6">
                            <p className="text-foreground mb-4">
                                If you have any questions about this Privacy Policy, the practices of the Service, or wish to exercise your data subject rights, please contact us:
                            </p>
                            <div className="space-y-3">
                                <div className="flex items-start">
                                    <Mail className="w-5 h-5 mr-3 mt-0.5 text-primary" />
                                    <div>
                                        <p className="font-semibold text-foreground">Email:</p>
                                        <p className="text-muted-foreground">Rooli[at]cresthub.com</p>
                                        <p className="text-sm text-muted-foreground mt-1">(Please title your email: "Privacy Policy Inquiry")</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <Building2 className="w-5 h-5 mr-3 mt-0.5 text-primary" />
                                    <div>
                                        <p className="font-semibold text-foreground">Company Name:</p>
                                        <p className="text-muted-foreground">Cresthub Media</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <MapPin className="w-5 h-5 mr-3 mt-0.5 text-primary" />
                                    <div>
                                        <p className="font-semibold text-foreground">Company Address:</p>
                                        <p className="text-muted-foreground">RAYFIELD, JOS, PLATEAU STATE, NIGERIA</p>
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
