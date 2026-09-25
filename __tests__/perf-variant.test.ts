describe("PERF_VARIANT", () => {
  const originalValue = process.env.PERF_VARIANT
  const originalVercelEnvironment = process.env.VERCEL_ENV

  afterEach(() => {
    if (originalValue === undefined) delete process.env.PERF_VARIANT
    else process.env.PERF_VARIANT = originalValue
    if (originalVercelEnvironment === undefined) delete process.env.VERCEL_ENV
    else process.env.VERCEL_ENV = originalVercelEnvironment
    jest.resetModules()
  })

  it.each(["baseline", "no-sphere", "no-lenis", "no-hero-motion"] as const)(
    "aceita a variante %s",
    async (variant) => {
      process.env.PERF_VARIANT = variant
      const { getPerfVariant } = await import("@/lib/perf-variant")

      expect(getPerfVariant()).toBe(variant)
    },
  )

  it("usa baseline quando a variável está ausente", async () => {
    delete process.env.PERF_VARIANT
    const { getPerfVariant } = await import("@/lib/perf-variant")

    expect(getPerfVariant()).toBe("baseline")
  })

  it("usa baseline quando o valor não é reconhecido", async () => {
    process.env.PERF_VARIANT = "valor-invalido"
    const { getPerfVariant } = await import("@/lib/perf-variant")

    expect(getPerfVariant()).toBe("baseline")
  })

  it("identifica o ambiente Preview da Vercel", async () => {
    process.env.VERCEL_ENV = "preview"
    const { isPreviewDeployment } = await import("@/lib/perf-variant")

    expect(isPreviewDeployment()).toBe(true)
  })
})
