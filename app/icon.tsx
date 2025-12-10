import { ImageResponse } from 'next/og'
import { readFileSync } from 'fs'
import { join } from 'path'

// Route segment config
export const runtime = 'nodejs'

// Image metadata
export const size = {
    width: 32,
    height: 32,
}
export const contentType = 'image/png'

// Image generation
export default function Icon() {
    try {
        // Attempt to read the logo file
        const logoPath = join(process.cwd(), 'public', 'recobra-logo.png')
        const logoData = readFileSync(logoPath)
        const base64Logo = `data:image/png;base64,${logoData.toString('base64')}`

        return new ImageResponse(
            (
                <div
                    style={{
                        background: 'black',
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '0%', // Square as requested, or can be rounded
                    }}
                >
                    {/* Render the logo centered with padding */}
                    <img
                        src={base64Logo}
                        width="22"
                        height="22"
                        style={{
                            objectFit: 'contain',
                        }}
                    />
                </div>
            ),
            {
                ...size,
            }
        )
    } catch (e) {
        // Fallback if file not found
        return new ImageResponse(
            (
                <div
                    style={{
                        background: 'black',
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: 20
                    }}
                >
                    R
                </div>
            ),
            { ...size }
        )
    }
}
