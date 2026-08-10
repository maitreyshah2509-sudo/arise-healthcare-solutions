import { motion } from "framer-motion";
import { Reveal, SectionHeading } from "./Reveal";
import endoscope from "@/assets/gallery-endoscope.jpg";
import camera from "@/assets/gallery-camera.jpg";
import lab from "@/assets/gallery-lab.jpg";
import pcb from "@/assets/gallery-pcb.jpg";

const ITEMS = [
  { src: endoscope, title: "Rigid & Flexible Endoscopes", tag: "Endoscopy" },
  { src: camera, title: "HD / 4K Camera Heads", tag: "Imaging" },
  { src: lab, title: "Micro-Soldering & Precision Rework", tag: "Diagnostic Lab" },
  { src: pcb, title: "Board-Level PCB Diagnosis", tag: "Component Repair" },
];

export function Gallery() {
  return (
    <section id="gallery" className="px-4 py-14">
      <SectionHeading
        eyebrow="Our lab"
        title="Inside the repair studio"
        subtitle="Calibrated diagnostics, component-level repair and documented quality testing."
      />
      <div className="mx-auto grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-2">
        {ITEMS.map((item, i) => (
          <Reveal key={item.title} delay={(i % 2) * 0.08}>
            <motion.figure
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              className="glass group relative overflow-hidden rounded-3xl"
            >
              <img
                src={item.src}
                alt={item.title}
                loading="lazy"
                width={1024}
                height={768}
                className="h-52 w-full object-cover transition-transform duration-700 group-hover:scale-105 sm:h-56"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent p-4">
                <span className="font-ui text-[0.65rem] uppercase tracking-[0.2em] text-gold">
                  {item.tag}
                </span>
                <p className="section-title text-base text-white">{item.title}</p>
              </figcaption>
            </motion.figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
