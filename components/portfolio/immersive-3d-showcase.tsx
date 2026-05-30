"use client"

import { useEffect, useRef, useState } from "react"
import * as THREE from "three"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, ArrowRight, Eye, X, Compass, ExternalLink } from "lucide-react"

interface ProjectItem {
  title: string
  category: string
  image: string
  desc: string
  link: string
  color: string
  tags: string[]
}

export function Immersive3DShowcase() {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const [activeIndex, setActiveIndex] = useState(0)
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null)
  const [isDragging, setIsDragging] = useState(false)

  const projects: ProjectItem[] = [
    {
      title: "Amppere Cable Branding",
      category: "Industrial Identity",
      image: "/figma-showcase/AC/AC (1).png",
      desc: "Bold high-tension red & industrial charcoal identity formulated for commercial electrical power pipelines.",
      link: "https://www.instagram.com/ampperecable/",
      color: "#ef4444",
      tags: ["Creative Direction", "Logo Design", "Print Assets"]
    },
    {
      title: "Nexus Core Campaign",
      category: "Corporate Collateral",
      image: "/figma-showcase/NE/NE (1).png",
      desc: "Structured double-sided proposal brochures, business cards, and safety graphics communicating absolute trust.",
      link: "https://www.nexusengineering.in/",
      color: "#f97316",
      tags: ["Brand Identity", "Brochures", "CCTV Systems"]
    },
    {
      title: "Shreeman Legend synergy",
      category: "Creator Collaboration",
      image: "/figma-showcase/DS/Screenshot 2026-04-27 132832.png",
      desc: "High-energy entertainment graphics, YouTube banners, and launch stream materials designed for viral retention.",
      link: "https://www.instagram.com/shreemanlegend/",
      color: "#00e5ff",
      tags: ["Digital Compositing", "Typography", "Entertainment"]
    },
    {
      title: "Wedding Cinematic Films",
      category: "Post-Production",
      image: "/images/project-2.jpg",
      desc: "Pacing beautiful narrative clips to professional sound design layouts and DaVinci grading setups.",
      link: "https://drive.google.com/drive/folders/1VvkGflCJ9cCZjakHM6LSI-qx_NYaTgCD",
      color: "#ec4899",
      tags: ["Color Grading", "Foley Design", "Editing"]
    },
    {
      title: "Agro Tourism Campaign",
      category: "Commercial Film",
      image: "/images/project-4.jpg",
      desc: "Wide organic drone captures and travel edits styled for rural escapes and scenic tourist marketing.",
      link: "https://drive.google.com/drive/folders/1VvkGflCJ9cCZjakHM6LSI-qx_NYaTgCD",
      color: "#10b981",
      tags: ["Cinematography", "Drone Log", "Pacing"]
    }
  ]

  // Keep ref to state for Three.js render loop
  const activeIndexRef = useRef(0)
  const targetRotationY = useRef(0)
  const currentRotationY = useRef(0)

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return

    const container = containerRef.current
    const canvas = canvasRef.current

    // === THREE.JS INITIALIZATION ===
    const scene = new THREE.Scene()
    scene.fog = new THREE.FogExp2(0x000000, 0.08)

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    )
    camera.position.set(0, 0, 8.5)

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance"
    })
    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    // === 3D PARTICLE GALAXY BACKGROUND ===
    const particleCount = 1800
    const particleGeometry = new THREE.BufferGeometry()
    const positions = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)

    for (let i = 0; i < particleCount; i++) {
      // Swirling cylinder distribution
      const theta = Math.random() * Math.PI * 2
      const radius = 3 + Math.random() * 8
      const y = (Math.random() - 0.5) * 10
      
      positions[i * 3] = Math.cos(theta) * radius
      positions[i * 3 + 1] = y
      positions[i * 3 + 2] = Math.sin(theta) * radius

      // Soft blue/cyan gradient color palette
      colors[i * 3] = 0.0 // R
      colors[i * 3 + 1] = 0.4 + Math.random() * 0.4 // G
      colors[i * 3 + 2] = 0.8 + Math.random() * 0.2 // B
    }

    particleGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))
    particleGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3))

    // Point Texture
    const pointMaterial = new THREE.PointsMaterial({
      size: 0.04,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    })

    const particles = new THREE.Points(particleGeometry, pointMaterial)
    scene.add(particles)

    // === 3D CAROUSEL RING OF PROJECT IMAGES ===
    const textureLoader = new THREE.TextureLoader()
    const cardGroup = new THREE.Group()
    scene.add(cardGroup)

    const cardCount = projects.length
    const radius = 3.6
    const cards: THREE.Mesh[] = []

    const cardGeometry = new THREE.PlaneGeometry(2.4, 1.5)

    projects.forEach((proj, idx) => {
      // Load Texture
      const texture = textureLoader.load(proj.image)
      texture.colorSpace = THREE.SRGBColorSpace

      // Card Material (double sided, responds to glowing light)
      const material = new THREE.MeshBasicMaterial({
        map: texture,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.95
      })

      const mesh = new THREE.Mesh(cardGeometry, material)

      // Position in cylinder structure
      const angle = (idx / cardCount) * Math.PI * 2
      mesh.position.x = Math.sin(angle) * radius
      mesh.position.z = Math.cos(angle) * radius
      mesh.position.y = 0

      // Face toward center
      mesh.rotation.y = angle

      mesh.userData = { index: idx }
      cardGroup.add(mesh)
      cards.push(mesh)
    })

    // Ambient Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8)
    scene.add(ambientLight)

    // Glowing directional light
    const dirLight = new THREE.DirectionalLight(0x00e5ff, 1.2)
    dirLight.position.set(0, 5, 5)
    scene.add(dirLight)

    // === INTERACTIVE EVENT HANDLERS ===
    let startX = 0
    let startRotationY = 0
    let isUserDragging = false

    const handlePointerDown = (e: PointerEvent) => {
      isUserDragging = true
      startX = e.clientX
      startRotationY = targetRotationY.current
      canvas.style.cursor = "grabbing"
    }

    const handlePointerMove = (e: PointerEvent) => {
      if (!isUserDragging) return
      
      const deltaX = e.clientX - startX
      // Convert pixel drag to Y rotation
      targetRotationY.current = startRotationY + deltaX * 0.0055
    }

    const handlePointerUp = () => {
      if (!isUserDragging) return
      isUserDragging = false
      canvas.style.cursor = "grab"

      // Snap to closest project index card
      const anglePerCard = (Math.PI * 2) / cardCount
      // Standardize rotation angle
      const snappedIndex = Math.round(targetRotationY.current / anglePerCard)
      
      targetRotationY.current = snappedIndex * anglePerCard

      // Calculate current positive index
      let finalIndex = -snappedIndex % cardCount
      if (finalIndex < 0) finalIndex += cardCount

      setActiveIndex(finalIndex)
      activeIndexRef.current = finalIndex
    }

    canvas.addEventListener("pointerdown", handlePointerDown)
    canvas.addEventListener("pointermove", handlePointerMove)
    window.addEventListener("pointerup", handlePointerUp)

    // Click on Card (Raycasting)
    const raycaster = new THREE.Raycaster()
    const mouse = new THREE.Vector2()

    const handleCanvasClick = (e: MouseEvent) => {
      // Calculate mouse in normalized device coordinates
      const rect = canvas.getBoundingClientRect()
      mouse.x = ((e.clientX - rect.left) / canvas.clientWidth) * 2 - 1
      mouse.y = -((e.clientY - rect.top) / canvas.clientHeight) * 2 + 1

      raycaster.setFromCamera(mouse, camera)
      const intersects = raycaster.intersectObjects(cardGroup.children)

      if (intersects.length > 0) {
        const clickedCard = intersects[0].object as THREE.Mesh
        const idx = clickedCard.userData.index

        // Rotate to clicked card
        const anglePerCard = (Math.PI * 2) / cardCount
        targetRotationY.current = -idx * anglePerCard

        setActiveIndex(idx)
        activeIndexRef.current = idx

        // Trigger Details
        setTimeout(() => {
          setSelectedProject(projects[idx])
        }, 300)
      }
    }

    canvas.addEventListener("click", handleCanvasClick)

    // === ANIMATION RENDER LOOP ===
    let animationFrameId = 0
    const clock = new THREE.Clock()

    const animate = () => {
      const elapsedTime = clock.getElapsedTime()

      // Swirling Particle animation
      particles.rotation.y = elapsedTime * 0.02
      particles.rotation.x = Math.sin(elapsedTime * 0.05) * 0.05

      // Smooth Lerp Rotation
      currentRotationY.current += (targetRotationY.current - currentRotationY.current) * 0.08
      cardGroup.rotation.y = currentRotationY.current

      // Soft breathing hover on cards
      cards.forEach((card, idx) => {
        const angle = (idx / cardCount) * Math.PI * 2
        card.position.y = Math.sin(elapsedTime * 1.5 + angle * 2) * 0.08
        
        // Highlight active card
        if (idx === activeIndexRef.current) {
          (card.material as THREE.MeshBasicMaterial).opacity = 1.0
          card.scale.set(1.08, 1.08, 1)
        } else {
          (card.material as THREE.MeshBasicMaterial).opacity = 0.5
          card.scale.set(0.9, 0.9, 1)
        }
      })

      renderer.render(scene, camera)
      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    // === RESIZE HANDLING ===
    const handleResize = () => {
      camera.aspect = container.clientWidth / container.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(container.clientWidth, container.clientHeight)
    }
    window.addEventListener("resize", handleResize)

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId)
      canvas.removeEventListener("pointerdown", handlePointerDown)
      canvas.removeEventListener("pointermove", handlePointerMove)
      window.removeEventListener("pointerup", handlePointerUp)
      canvas.removeEventListener("click", handleCanvasClick)
      window.removeEventListener("resize", handleResize)
      
      // Geometry & Material disposals
      particleGeometry.dispose()
      pointMaterial.dispose()
      cardGeometry.dispose()
      cards.forEach((c) => {
        (c.material as THREE.MeshBasicMaterial).dispose()
      })
    }
  }, [])

  // Rotate Carousel Manually
  const navigateCarousel = (direction: "left" | "right") => {
    const cardCount = projects.length
    const anglePerCard = (Math.PI * 2) / cardCount
    
    let nextIndex = activeIndex
    if (direction === "left") {
      targetRotationY.current += anglePerCard
      nextIndex = (activeIndex - 1 + cardCount) % cardCount
    } else {
      targetRotationY.current -= anglePerCard
      nextIndex = (activeIndex + 1) % cardCount
    }

    setActiveIndex(nextIndex)
    activeIndexRef.current = nextIndex
  }

  return (
    <section 
      id="branding"
      className="relative w-full h-screen bg-black overflow-hidden flex flex-col justify-center items-center"
    >
      {/* Background radial gradient glow */}
      <div className="absolute inset-0 bg-radial-gradient from-blue-900/10 via-transparent to-transparent pointer-events-none" />

      {/* Dynamic 3D canvas viewport container */}
      <div ref={containerRef} className="absolute inset-0 w-full h-full z-10">
        <canvas ref={canvasRef} className="w-full h-full cursor-grab" />
      </div>

      {/* Header Overlay */}
      <div className="absolute top-16 left-6 md:left-16 z-20 pointer-events-none max-w-lg">
        <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-cyan-400 mb-3 block">
          — 02 / 3D GRAPHICS PORTAL
        </span>
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white font-serif mb-4 leading-tight">
          Interactive <br />
          <span className="italic font-light text-zinc-400">Design Ring.</span>
        </h2>
        <p className="text-xs text-zinc-500 leading-relaxed font-light hidden md:block">
          Click and drag, scroll, or swipe the 3D meshes to rotate your view. Click a project plane card to expand the high-fidelity branding metadata details.
        </p>
      </div>

      {/* Help Overlay Instruction */}
      <div className="absolute top-20 right-6 md:right-16 z-20 flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-2 rounded-full backdrop-blur-md">
        <span className="text-[8px] font-mono uppercase tracking-widest text-zinc-400">Drag space or click card to explore</span>
        <Compass className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
      </div>

      {/* Left/Right Manual Navigation Controls */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex items-center gap-6 bg-zinc-950/80 border border-white/5 px-6 py-3 rounded-full backdrop-blur-md">
        <button
          onClick={() => navigateCarousel("left")}
          className="h-10 w-10 rounded-full border border-white/10 flex items-center justify-center text-zinc-400 hover:text-cyan-400 hover:border-cyan-400 transition-colors"
        >
          <ArrowLeft size={16} />
        </button>

        <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">
          Project <span className="text-white font-bold">0{activeIndex + 1}</span> / 0{projects.length}
        </span>

        <button
          onClick={() => navigateCarousel("right")}
          className="h-10 w-10 rounded-full border border-white/10 flex items-center justify-center text-zinc-400 hover:text-cyan-400 hover:border-cyan-400 transition-colors"
        >
          <ArrowRight size={16} />
        </button>
      </div>

      {/* Center Dynamic Label details */}
      <div className="absolute bottom-28 left-6 md:left-16 z-20 pointer-events-none">
        <span className="text-[8px] font-mono uppercase tracking-widest text-cyan-400 mb-1.5 block">
          {projects[activeIndex].category}
        </span>
        <h3 className="text-2xl font-serif text-white tracking-tight leading-none mb-1">
          {projects[activeIndex].title}
        </h3>
        <p className="text-[10px] text-zinc-500 font-light max-w-sm hidden sm:block">
          {projects[activeIndex].desc}
        </p>
      </div>

      {/* Fullscreen Immersive Details Overlay */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center p-4 md:p-8"
          >
            <motion.div
              initial={{ scale: 0.92, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, y: 20 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-4xl bg-zinc-950 border border-white/10 rounded-[3rem] p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center overflow-hidden"
            >
              {/* Blur Backdrops */}
              <div 
                className="absolute -top-1/4 -right-1/4 w-[400px] h-[400px] rounded-full blur-[100px] opacity-15"
                style={{ backgroundColor: selectedProject.color }}
              />

              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-8 right-8 h-12 w-12 rounded-full bg-white/5 border border-white/10 text-zinc-400 hover:text-white hover:border-white/20 hover:rotate-90 transition-all flex items-center justify-center cursor-pointer"
              >
                <X size={20} />
              </button>

              {/* Left Column: Visual Asset */}
              <div className="relative w-full h-[240px] md:h-[360px] rounded-2xl overflow-hidden border border-white/10 bg-zinc-900 shadow-2xl">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>

              {/* Right Column: Project Details */}
              <div className="flex flex-col justify-between h-full py-4 text-left">
                <div>
                  <span 
                    className="text-[9px] font-mono uppercase tracking-[0.25em] px-3 py-1 rounded-full border mb-4 inline-block"
                    style={{ color: selectedProject.color, borderColor: `${selectedProject.color}33`, backgroundColor: `${selectedProject.color}0D` }}
                  >
                    {selectedProject.category}
                  </span>

                  <h3 className="text-3xl font-serif text-white tracking-tight mb-4 leading-tight">
                    {selectedProject.title}
                  </h3>

                  <p className="text-xs text-zinc-400 leading-relaxed font-light mb-8">
                    {selectedProject.desc}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {selectedProject.tags.map((tag) => (
                      <span 
                        key={tag}
                        className="text-[8px] font-mono uppercase tracking-widest bg-white/5 border border-white/10 px-3 py-1.5 rounded-full text-zinc-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <a
                    href={selectedProject.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 rounded-full bg-white px-8 py-3.5 text-[9px] font-bold uppercase tracking-widest text-black hover:bg-cyan-400 hover:scale-105 transition-all duration-300"
                  >
                    <span>Launch Brand Experience</span>
                    <ExternalLink size={12} />
                  </a>
                </div>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  )
}
