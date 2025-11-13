
import json

# Comprehensive Energy Fitness Equipment Catalog Database
equipment_catalog = {
    "brands": {
        "hoist": {
            "name": "HOIST Fitness",
            "category": "Premium Strength & Functional Training",
            "products": [
                {
                    "name": "ROC-IT® Selectorized",
                    "type": "Strength Machine",
                    "technology": "ROC-IT Dynamic Movement Technology",
                    "features": ["Bio-mechanically optimized", "Smooth natural movements", "Joint stress reduction"],
                    "use": "Commercial"
                },
                {
                    "name": "ROC-IT® Plate Loaded",
                    "type": "Strength Equipment",
                    "technology": "Dynamic movement engagement",
                    "features": ["Core muscle engagement", "Proper form promotion", "Professional athlete favorite"],
                    "use": "Commercial"
                },
                {
                    "name": "Mi5 Functional Trainer",
                    "type": "Functional Trainer",
                    "features": ["Dual weight stacks", "360-degree rotation", "Space-efficient"],
                    "use": "Commercial"
                },
                {
                    "name": "Mi6 Functional Trainer",
                    "type": "Functional Trainer",
                    "features": ["Pulley columns with 360-degree rotation", "Integrated Adjustment System", "Quick Release Adaptors"],
                    "use": "Commercial"
                },
                {
                    "name": "Mi7 Smith",
                    "type": "Smith Machine",
                    "features": ["Functional training capability", "Ultra-lite Lifting System (30lbs)", "Sleek minimal design"],
                    "use": "Commercial"
                },
                {
                    "name": "Multi Stack Stations",
                    "type": "Multi-Function",
                    "features": ["Multiple user stations", "Space maximization", "Customizable"],
                    "use": "Commercial"
                },
                {
                    "name": "H-4400 4 Stack Multi Gym",
                    "type": "Multi-Station Gym",
                    "features": ["4 simultaneous users", "Customizable", "Space efficient"],
                    "use": "Commercial"
                }
            ]
        },
        "freemotion": {
            "name": "FreeMotion Cardio",
            "category": "Premium Cardio Equipment",
            "products": [
                {
                    "name": "t22.9 REFLEX Treadmill",
                    "model": "FMTL70920",
                    "type": "Treadmill",
                    "specs": {
                        "speed": "0-15 mph",
                        "incline": "0-15%",
                        "weight_capacity": "400 lbs",
                        "display": "22 inch HD Touchscreen",
                        "features": ["iFIT integration", "Impact-reducing deck", "Heart rate monitoring"]
                    },
                    "use": "Commercial"
                },
                {
                    "name": "r22.9 Recumbent Bike",
                    "model": "FMEX82520",
                    "type": "Recumbent Bike",
                    "specs": {
                        "weight_capacity": "400 lbs",
                        "display": "22 inch HD Touchscreen",
                        "resistance_levels": "1-24",
                        "features": ["Back-friendly", "Step-Thru design", "iFIT on-demand"]
                    },
                    "use": "Commercial"
                },
                {
                    "name": "CoachBike",
                    "model": "FMEX84821",
                    "type": "Indoor Bike",
                    "features": ["Immersive touchscreen (22in)", "20% Incline/-10% Decline", "SMR Silent Magnetic Resistance"],
                    "use": "Commercial"
                },
                {
                    "name": "e22.9 Elliptical",
                    "model": "FMEL84420",
                    "type": "Elliptical",
                    "features": ["Full-body workout", "Low-impact cardio", "iFIT compatible"],
                    "use": "Commercial"
                }
            ]
        },
        "tunturi": {
            "name": "Tunturi Fitness",
            "category": "European Quality Equipment",
            "products": [
                {
                    "name": "Cardio Fit Series",
                    "type": "Cardio Equipment",
                    "models": ["2020", "2022"],
                    "features": ["Durable construction", "Wide resistance range", "European engineering"],
                    "use": "Commercial & Domestic"
                },
                {
                    "name": "T90 Motorised Treadmill",
                    "type": "Treadmill",
                    "specs": {
                        "motor": "5.0 HP AC",
                        "speed": "0.8-24 km/h",
                        "incline": "0-15%",
                        "running_area": "153 x 55 cm",
                        "weight_capacity": "150 kg",
                        "features": ["T-Flex Comfort+ shock", "Bluetooth enabled", "LCD display"]
                    },
                    "use": "Commercial"
                }
            ]
        },
        "concept2": {
            "name": "Concept2",
            "category": "Premium Indoor Rowers",
            "products": [
                {
                    "name": "RowErg",
                    "type": "Indoor Rower",
                    "specs": {
                        "length": "244 cm",
                        "width": "61 cm",
                        "weight_capacity": "227 kg",
                        "monitor": "PM5",
                        "features": ["Full-body workout", "Low-impact", "Adjustable footrests"]
                    },
                    "use": "Commercial & Home",
                    "notes": "Available with standard or tall legs"
                }
            ]
        },
        "energie_fitness": {
            "name": "Energie Fitness",
            "category": "Indian Quality Equipment",
            "products": [
                {
                    "name": "ETB-17 Functional Trainer",
                    "type": "Functional Trainer",
                    "specs": {
                        "length": "1050 mm",
                        "width": "1950 mm",
                        "height": "2300 mm",
                        "weight": "382 kg",
                        "weight_stack": "200 kg",
                        "features": ["Heavy-duty frame", "Dual weight stacks", "10+ adjustments", "Multi-planar motion"]
                    },
                    "use": "Commercial"
                },
                {
                    "name": "PRO Single Station Series",
                    "type": "Single Station Machines",
                    "models": ["PRO-001 to PRO-014"],
                    "models_detail": {
                        "PRO-001": "Premium Chest Press",
                        "PRO-002": "Incline Chest Press",
                        "PRO-003": "Shoulder Press",
                        "PRO-004": "Low Row",
                        "PRO-005": "Wide Chest Press",
                        "PRO-006": "Row Machine",
                        "PRO-007": "Pull Down",
                        "PRO-008": "Rear Kick",
                        "PRO-009": "Leg Press 45°",
                        "PRO-010": "Calf Machine",
                        "PRO-011": "Biceps Machine",
                        "PRO-012": "Triceps Machine",
                        "PRO-013": "Standing Leg Curl",
                        "PRO-014": "Leg Extension"
                    },
                    "use": "Commercial"
                }
            ]
        },
        "vector_x": {
            "name": "Vector X Sports",
            "category": "Sports & Fitness Accessories",
            "products": [
                {
                    "name": "Exercise Wheels",
                    "type": "Core Training",
                    "varieties": ["Double Wheel", "4 Wheel with Knee Mat", "Broad Exercise Wheel"]
                },
                {
                    "name": "Yoga Equipment",
                    "type": "Flexibility Training",
                    "varieties": ["Yoga Wheels", "Yoga Mats"]
                }
            ]
        }
    },
    "categories": {
        "strength": ["Chest Press", "Leg Press", "Row Machine", "Shoulder Press", "Pull Down", "Functional Trainers"],
        "cardio": ["Treadmills", "Exercise Bikes", "Recumbent Bikes", "Ellipticals", "Indoor Rowers", "Incline Trainers"],
        "accessories": ["Dumbbells", "Weight Plates", "Resistance Bands", "Yoga Equipment"],
        "commercial": ["Multi-Stack Systems", "Selectorized Machines", "Plate-Loaded Equipment"],
        "domestic": ["Home Gyms", "Compact Equipment", "Foldable Machines"]
    }
}

# Save as JSON for the app
catalog_json = json.dumps(equipment_catalog, indent=2)
print("Equipment Catalog Database Created Successfully")
print(f"Total Brands: {len(equipment_catalog['brands'])}")
print(f"Categories: {list(equipment_catalog['categories'].keys())}")
