import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import {
    ArrowLeft,
    ShieldCheck,
    Scale,
    FileKey,
    Globe2,
    Lock,
    BellRing,
    ClipboardList,
    Users,
    Building2,
    UserCheck,
    Mail,
} from "lucide-react"
import Image from "next/image"

export const metadata = {
    title: "Data Protection Policy - Rooli",
    description:
        "Rooli Data Protection Policy outlining GDPR, NDPA, and US privacy compliance, security controls, and governance obligations.",
}

const principles = [
    {
        principle: "Lawfulness, Fairness & Transparency",
        requirement:
            "Processing must have a clear lawful basis (Consent, Contract, Legal Obligation, Legitimate Interest) and be communicated transparently to Data Subjects.",
    },
    {
        principle: "Purpose Limitation",
        requirement:
            "Data is collected for specified, explicit, and legitimate purposes and must not be further processed in a manner incompatible with those purposes.",
    },
    {
        principle: "Data Minimisation",
        requirement: "Data collected must be adequate, relevant, and limited to what is strictly necessary for the purpose of processing.",
    },
    {
        principle: "Accuracy",
        requirement:
            "Personal Data must be accurate and, where necessary, kept up to date. Every reasonable step must be taken to ensure inaccurate data is corrected or erased.",
    },
    {
        principle: "Storage Limitation",
        requirement:
            "Personal Data shall be kept only for as long as necessary for the purposes for which the Personal Data is processed.",
    },
    {
        principle: "Integrity & Confidentiality",
        requirement:
            "Processing must ensure appropriate security, including protection against unauthorised or unlawful processing and accidental loss, destruction, or damage.",
    },
    {
        principle: "Accountability",
        requirement: "Cresthub Media (Rooli) is responsible for, and must be able to demonstrate compliance with, all principles.",
    },
]

const lawfulBases = [
    {
        basis: "Contractual Necessity",
        detail:
            "Processing data required to fulfil the Rooli Terms and Conditions (e.g. managing user accounts, executing scheduled posts).",
    },
    {
        basis: "Consent (Opt-in)",
        detail:
            "Used for marketing communications, non-essential cookies, and any processing that goes beyond the core service. Consent must be freely given, specific, informed, and unambiguous.",
    },
    {
        basis: "Legitimate Interest",
        detail:
            "Used for core business functions such as product improvement, internal analytics, security, and fraud prevention, provided fundamental rights are not overridden.",
    },
    {
        basis: "Legal Obligation",
        detail:
            "Processing necessary to comply with legal or regulatory requirements (e.g. tax, audit, law enforcement requests).",
    },
]

const rights = [
    {
        right: "Right to Access",
        requirement: "Provide confirmation of processing and a copy of the data free of charge.",
        laws: "GDPR, NDPA, CCPA/CPRA",
    },
    {
        right: "Right to Rectification",
        requirement: "Correct inaccurate or incomplete Personal Data promptly.",
        laws: "All major laws",
    },
    {
        right: "Right to Erasure",
        requirement:
            "Delete Personal Data when no longer necessary, consent is withdrawn, or data was processed unlawfully (Right to be Forgotten).",
        laws: "GDPR, NDPA, CCPA/CPRA",
    },
    {
        right: "Right to Restriction",
        requirement: "Temporarily halt processing while accuracy or lawfulness is contested.",
        laws: "GDPR, NDPA",
    },
    {
        right: "Right to Data Portability",
        requirement: "Provide data in a structured, commonly used, machine-readable format.",
        laws: "GDPR, NDPA, CCPA/CPRA",
    },
    {
        right: "Right to Object",
        requirement: "Stop processing for direct marketing or based on Legitimate Interests.",
        laws: "GDPR, NDPA, CCPA/CPRA",
    },
    {
        right: "Opt-Out of Sale/Sharing",
        requirement: "Provide a mechanism to opt out of the ‘sale’ or ‘sharing’ of data for cross-context behavioural advertising.",
        laws: "CCPA/CPRA",
    },
]

export default function DataPolicyPage() {
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

            {/* Hero */}
            <section className="py-16 lg:py-24 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 mb-4">
                            <span className="text-4xl">🛡️</span>
                            <CardDescription className="text-lg font-medium">Internal Governance</CardDescription>
                        </div>
                        <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">Rooli Data Protection Policy</h1>
                        <p className="text-muted-foreground text-lg">
                            Policy Owner: Data Protection Officer · Version 1.5 · Effective Date: November, 2025 · Company: Cresthub Media Limited
                        </p>
                    </div>
                </div>
            </section>

            <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-5xl space-y-12">
                {/* Policy Statement */}
                <section>
                    <Card>
                        <CardHeader>
                            <div className="flex items-center gap-3">
                                <ShieldCheck className="h-7 w-7 text-primary" />
                                <div>
                                    <CardTitle>1. Policy Statement & Principles</CardTitle>
                                    <CardDescription>
                                        Commitment to GDPR, NDPA 2023, and relevant U.S. State Privacy Laws (CCPA/CPRA)
                                    </CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <p className="text-muted-foreground leading-relaxed">
                                Cresthub Media (Rooli) is committed to protecting the personal data of employees, customers, partners, and other stakeholders. All Personal Data processed by Rooli must comply with international best practices and the seven core principles below.
                            </p>
                            <div className="overflow-x-auto border border-border rounded-lg">
                                <table className="w-full text-left">
                                    <thead className="bg-muted/60">
                                        <tr>
                                            <th className="p-4 font-semibold text-foreground">Principle</th>
                                            <th className="p-4 font-semibold text-foreground">Requirement</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {principles.map((item, idx) => (
                                            <tr key={item.principle} className={idx % 2 === 0 ? "bg-background" : "bg-muted/30"}>
                                                <td className="align-top p-4 font-medium text-foreground w-1/3">{item.principle}</td>
                                                <td className="p-4 text-muted-foreground">{item.requirement}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </CardContent>
                    </Card>
                </section>

                {/* Legal Basis for Processing */}
                <section>
                    <Card>
                        <CardHeader>
                            <div className="flex items-center gap-3">
                                <Scale className="h-7 w-7 text-secondary" />
                                <div>
                                    <CardTitle>2. Legal Basis for Processing</CardTitle>
                                    <CardDescription>Every instance of processing must be linked to a documented lawful basis.</CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {lawfulBases.map((basis) => (
                                <div key={basis.basis} className="p-4 bg-muted/50 rounded-lg border border-border">
                                    <h3 className="text-lg font-semibold text-foreground">{basis.basis}</h3>
                                    <p className="text-muted-foreground">{basis.detail}</p>
                                </div>
                            ))}
                            <p className="text-xs text-muted-foreground">
                                * Consent must meet GDPR/NDPA standards; legal obligations include responding to lawful requests from supervisory authorities.
                            </p>
                        </CardContent>
                    </Card>
                </section>

                {/* Data Subject Rights */}
                <section>
                    <Card>
                        <CardHeader>
                            <div className="flex items-center gap-3">
                                <FileKey className="h-7 w-7 text-primary" />
                                <div>
                                    <CardTitle>3. Data Subject Rights Management</CardTitle>
                                    <CardDescription>
                                        Requests must be actioned without undue delay and within one (1) calendar month (GDPR/NDPA standard).
                                    </CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="overflow-x-auto border border-border rounded-lg">
                                <table className="w-full text-left">
                                    <thead className="bg-muted/60">
                                        <tr>
                                            <th className="p-4 font-semibold text-foreground">Right</th>
                                            <th className="p-4 font-semibold text-foreground">Compliance Requirement</th>
                                            <th className="p-4 font-semibold text-foreground">Applicable Laws</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {rights.map((item, idx) => (
                                            <tr key={item.right} className={idx % 2 === 0 ? "bg-background" : "bg-muted/30"}>
                                                <td className="p-4 font-medium text-foreground w-1/3">{item.right}</td>
                                                <td className="p-4 text-muted-foreground">{item.requirement}</td>
                                                <td className="p-4 text-muted-foreground w-1/4">{item.laws}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </CardContent>
                    </Card>
                </section>

                {/* Cross-Border Transfers */}
                <section>
                    <Card>
                        <CardHeader>
                            <div className="flex items-center gap-3">
                                <Globe2 className="h-7 w-7 text-secondary" />
                                <div>
                                    <CardTitle>4. Cross-Border Data Transfers</CardTitle>
                                    <CardDescription>Sustaining compliance for transfers outside Nigeria, the EEA, and relevant U.S. States.</CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p className="text-muted-foreground leading-relaxed">
                                Personal Data transfers outside the Federal Republic of Nigeria, the European Economic Area (EEA), or relevant U.S. States must be protected by appropriate safeguards.
                            </p>
                            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                                <li>
                                    <span className="font-semibold text-foreground">NDPA/GDPR Compliance:</span> Transfers require an Adequacy Decision (if applicable) or the use of Standard Contractual Clauses (SCCs) or Binding Corporate Rules (BCRs) to ensure equivalent protection.
                                </li>
                                <li>
                                    <span className="font-semibold text-foreground">U.S. Compliance:</span> Transfers must be transparently disclosed in the Privacy Policy. Any transfer constituting a “sale” or “sharing” must respect the User's Right to Opt-Out.
                                </li>
                            </ul>
                        </CardContent>
                    </Card>
                </section>

                {/* Security and Breach Management */}
                <section>
                    <Card>
                        <CardHeader>
                            <div className="flex items-center gap-3">
                                <Lock className="h-7 w-7 text-primary" />
                                <div>
                                    <CardTitle>5. Security & Breach Management</CardTitle>
                                    <CardDescription>Technical and organisational measures (TOMs) and breach notification requirements.</CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div>
                                <h3 className="text-lg font-semibold text-foreground mb-2">5.1 Security Measures</h3>
                                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                                    <li>Encryption of data in transit (TLS/SSL) and at rest.</li>
                                    <li>Access control based on the principle of Least Privilege.</li>
                                    <li>Pseudonymisation and anonymisation techniques where appropriate.</li>
                                    <li>Regular security assessments, penetration testing, and vendor due diligence.</li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-foreground mb-2">5.2 Data Breach Notification</h3>
                                <ul className="space-y-2 text-muted-foreground">
                                    <li>
                                        <span className="font-semibold text-foreground">Regulatory Notification (NDPA/GDPR):</span> Notify the relevant supervisory authority within 72 hours of becoming aware of the breach, where feasible, if likely to result in risk to rights and freedoms.
                                    </li>
                                    <li>
                                        <span className="font-semibold text-foreground">Data Subject Notification (All Laws):</span> Communicate the breach without undue delay if likely to result in high risk to Data Subjects.
                                    </li>
                                </ul>
                            </div>
                        </CardContent>
                    </Card>
                </section>

                {/* DPIA & Privacy by Design */}
                <section>
                    <Card>
                        <CardHeader>
                            <div className="flex items-center gap-3">
                                <ClipboardList className="h-7 w-7 text-secondary" />
                                <div>
                                    <CardTitle>6. DPIA & Privacy by Design</CardTitle>
                                    <CardDescription>Embedding privacy throughout product development and operations.</CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="p-4 bg-muted/50 rounded-lg border border-border">
                                <h3 className="text-lg font-semibold text-foreground">6.1 DPIA Requirement</h3>
                                <p className="text-muted-foreground">
                                    Conduct a Data Protection Impact Assessment (DPIA) before any new processing likely to result in high risk to Data Subjects. Mandatory under GDPR/NDPA and considered best practice under U.S. privacy laws.
                                </p>
                            </div>
                            <div className="p-4 bg-muted/50 rounded-lg border border-border">
                                <h3 className="text-lg font-semibold text-foreground">6.2 Privacy by Design & Default</h3>
                                <p className="text-muted-foreground">
                                    All new features, systems, and product developments must incorporate data protection principles from the outset (Privacy by Design). By default, only the minimum amount of Personal Data necessary must be processed (Privacy by Default – Data Minimisation).
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </section>

                {/* Responsibilities */}
                <section>
                    <Card>
                        <CardHeader>
                            <div className="flex items-center gap-3">
                                <Users className="h-7 w-7 text-primary" />
                                <div>
                                    <CardTitle>7. Roles & Responsibilities</CardTitle>
                                    <CardDescription>Defining accountability across Cresthub Media (Rooli).</CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid gap-4 md:grid-cols-3">
                                <Card className="bg-muted/50">
                                    <CardHeader>
                                        <Building2 className="h-6 w-6 text-primary" />
                                        <CardTitle>Cresthub Media (Rooli)</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-muted-foreground">
                                            Data Controller. Determines the purpose and means of processing and oversees compliance.
                                        </p>
                                    </CardContent>
                                </Card>
                                <Card className="bg-muted/50">
                                    <CardHeader>
                                        <UserCheck className="h-6 w-6 text-primary" />
                                        <CardTitle>Data Protection Officer (DPO)</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-muted-foreground">
                                            Monitors compliance, advises the organisation, and acts as contact point for supervisory authorities and Data Subjects.
                                        </p>
                                    </CardContent>
                                </Card>
                                <Card className="bg-muted/50">
                                    <CardHeader>
                                        <Users className="h-6 w-6 text-primary" />
                                        <CardTitle>All Employees</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-muted-foreground">
                                            Must adhere to this Policy, complete mandatory training, and immediately report potential incidents or breaches.
                                        </p>
                                    </CardContent>
                                </Card>
                            </div>
                        </CardContent>
                    </Card>
                </section>

                {/* Contact & Governance */}
                <section>
                    <Card className="bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/30">
                        <CardHeader className="text-center">
                            <div className="flex items-center justify-center gap-3">
                                <BellRing className="h-6 w-6 text-primary" />
                                <CardTitle>Questions or Requests?</CardTitle>
                            </div>
                            <CardDescription>
                                Contact our Data Protection Officer for access requests, DPIA support, or incident reporting.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4 text-center">
                            <div className="flex flex-col items-center gap-2">
                                <Mail className="h-5 w-5 text-primary" />
                                <p className="font-semibold text-foreground">Email</p>
                                <p className="text-muted-foreground">Rooli[at]cresthub.com</p>
                                <p className="text-xs text-muted-foreground">Please title your email: “Data Protection Inquiry”</p>
                            </div>
                            <div className="flex flex-col items-center gap-2">
                                <Building2 className="h-5 w-5 text-primary" />
                                <p className="font-semibold text-foreground">Registered Office</p>
                                <p className="text-muted-foreground">Cresthub Media · RAYFIELD, JOS, PLATEAU STATE, NIGERIA</p>
                            </div>
                        </CardContent>
                    </Card>
                </section>
            </main>
        </div>
    )
}



