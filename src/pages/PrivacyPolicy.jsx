import React from 'react';

export default function PrivacyPolicy() {
    return (
        <main className="min-h-screen px-6 py-12 max-w-6xl mx-auto title-small">
            <h1 className="heading-monoton mb-6 text-center mt-24">Privacy Policy</h1>

            <section className="mb-8">
                <p>
                    Your privacy is important to us. This policy explains how we collect, use, and protect the data you provide when submitting your artistic works to our fanzine.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-semibold mb-2">Data Collection</h2>
                <p>
                    We collect only the personal data you voluntarily provide when submitting your artwork, including your name, email address, and the submitted materials such as photos, music tracks, paintings, sculptures, or other artistic works.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-semibold mb-2">Use of Data</h2>
                <p>
                    The data collected is used solely to review your submissions and contact you regarding your artworks.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-semibold mb-2">Data Sharing</h2>
                <p>
                    We do not sell or share your personal data with third parties except as necessary to manage and host the submitted content.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-semibold mb-2">Cookies and Tracking Technologies</h2>
                <p>
                    Our site does not use cookies or tracking technologies for data collection. If we start using such technologies in the future, we will update this policy accordingly.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-semibold mb-2">User Rights</h2>
                <p>
                    You can request access to, correction, or deletion of your data at any time by contacting us at{' '}
                    <a
                        href="mailto:your.email@example.com"
                        className="underline font-bold"
                    >
                        your.email@example.com
                    </a>.
                </p>
            </section>

            <section>
                <p className="text-sm ">
                    Last updated: July 11, 2025
                </p>
            </section>
        </main>
    );
}
